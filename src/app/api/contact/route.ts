import { NextRequest, NextResponse } from 'next/server'
import { saveContactLead } from '@/lib/supabase'
import { validateContactForm } from '@/lib/validation'
import { logger, generateRequestId } from '@/lib/logger'

async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean }> {
  // Implement rate limiting logic
  // For now, return allowed
  return { allowed: true }
}

async function sendNotificationEmail(data: any): Promise<void> {
  // Mock email service - would integrate with SendGrid, etc.
  logger.info('Email notification sent', { to: 'hello@mybusinessos.com', data })
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

    // Save to database
    const result = await saveContactLead(validation.data)
    
    if (!result) {
      logger.error('Database insertion failed', { data: validation.data, requestId })
      throw new Error('Database error occurred')
    }

    logger.info('Contact form submission successful', { id: result.id, requestId })

    // Send notification email (with error handling)
    try {
      await sendNotificationEmail(validation.data)
    } catch (emailError) {
      logger.error('Email notification failed', { emailError, requestId })
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: "Thank you for your message. We'll be in touch soon!" 
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