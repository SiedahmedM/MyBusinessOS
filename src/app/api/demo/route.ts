import { NextRequest, NextResponse } from 'next/server'
import { saveDemoRequest } from '@/lib/supabase'
import { validateDemoRequest } from '@/lib/validation'
import { logger, generateRequestId } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    logger.info('Demo request started', { requestId })
    
    const body = await request.json()
    
    // Validate input
    const validation = validateDemoRequest(body)
    if (!validation.success) {
      logger.warn('Demo request validation failed', { errors: validation.errors, requestId })
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.errors },
        { status: 400 }
      )
    }

    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Save to database
    const result = await saveDemoRequest({
      session_id: validation.data.sessionId,
      business_type: validation.data.businessType,
      description: validation.data.description
    })
    
    if (!result) {
      logger.error('Demo request database insertion failed', { data: validation.data, requestId })
      throw new Error('Database error occurred')
    }

    logger.info('Demo request successful', { id: result.id, requestId })

    return NextResponse.json({ 
      success: true, 
      message: 'Demo request processed successfully',
      demoId: result.id
    })

  } catch (error) {
    logger.error('Demo request failed', { error, requestId })
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        requestId
      },
      { status: 500 }
    )
  }
}