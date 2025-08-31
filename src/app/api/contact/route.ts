import { NextRequest, NextResponse } from 'next/server'
import { saveContactLead } from '@/lib/supabase'
import { validateContactForm } from '@/lib/validation'
import { logger, generateRequestId } from '@/lib/logger'
import { sendContactEmail } from '@/lib/email'

async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean }> {
  // Implement rate limiting logic
  // For now, return allowed
  return { allowed: true }
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    logger.info('Contact form submission started', { requestId })
    
    const body = await request.json()
    
    // Validate input
    const validation = validateContactForm(body)
    if (!validation.success) {
      logger.warn('Contact form validation failed', { errors: validation.errors, requestId })
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.errors },
        { status: 400 }
      )
    }

    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = await checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      logger.warn('Rate limit exceeded', { clientIP, requestId })
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Send email (critical path)
    try {
      await sendContactEmail(validation.data, { autoReply: true, requestId })
    } catch (emailError) {
      logger.error('Contact email failed', { emailError, requestId })
      // Attempt DB save anyway (non-blocking semantics)
      ;(async () => {
        try {
          const { name, email, businessType, message } = validation.data
          await saveContactLead({
            name,
            email,
            business_type: businessType,
            message,
          })
        } catch (dbErr) {
          logger.error('DB save failed after email failure', { dbErr, requestId })
        }
      })()

      return NextResponse.json(
        {
          error: 'We could not send your message via email right now. Please email us directly at contact@customsoftwarepro.com.',
          requestId,
        },
        { status: 503 }
      )
    }

    // Save to database (non-blocking — best effort)
    ;(async () => {
      try {
        const { name, email, businessType, message } = validation.data
        const result = await saveContactLead({
          name,
          email,
          business_type: businessType,
          message,
        })
        if (!result) throw new Error('No result from DB')
        logger.info('Contact form saved to DB', { id: result.id, requestId })
      } catch (err) {
        logger.warn('Contact form DB save failed (anon). Will try admin fallback if configured.', { err, requestId })
        try {
          const { saveContactLeadAdmin } = await import('@/lib/supabase')
          const { name, email, businessType, message } = validation.data
          const adminResult = await saveContactLeadAdmin({
            name,
            email,
            business_type: businessType,
            message,
          })
          if (adminResult) {
            logger.info('Contact form saved to DB via admin fallback', { id: adminResult.id, requestId })
          }
        } catch (adminErr) {
          logger.error('Contact form DB admin fallback failed', { adminErr, requestId })
        }
      }
    })()

    logger.info('Contact form submission successful', { requestId })

    return NextResponse.json({ 
      success: true, 
      message: "Thank you for your message! I'll get back to you shortly." 
    })

  } catch (error) {
    logger.error('Contact form submission failed', { error, requestId })
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        requestId
      },
      { status: 500 }
    )
  }
}