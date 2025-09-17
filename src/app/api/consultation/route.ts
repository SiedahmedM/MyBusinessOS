import { NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { sendConsultationEmail } from '@/lib/email'

const BookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  isoStart: z.string(),
  timezone: z.string().optional(),
})

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).slice(2)
  try {
    const body = await req.json()
    const parsed = BookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.format() }, { status: 400 })
    }
    await sendConsultationEmail(parsed.data, { requestId })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    logger.error('POST /api/consultation failed', { err })
    return NextResponse.json({ error: 'Failed to book. Please email contact@customsoftwarepro.com' }, { status: 500 })
  }
}

