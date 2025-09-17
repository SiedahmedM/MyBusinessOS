import { Resend } from 'resend'
import { logger } from '@/lib/logger'

export interface ContactEmailInput {
  name: string
  email: string
  phone?: string
  businessType: string
  message: string
}

export interface ConsultationEmailInput {
  name: string
  email: string
  phone?: string
  message?: string
  isoStart: string
  timezone?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'contact@customsoftwarepro.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hello@send.customsoftwarepro.com'
const DEV_FALLBACK_FROM = 'onboarding@resend.dev'

export async function sendContactEmail(data: ContactEmailInput, opts?: { autoReply?: boolean; requestId?: string }) {
  const requestId = opts?.requestId
  try {
    // Debug config snapshot
    logger.debug('Email config snapshot', {
      requestId,
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 7),
      from: FROM_EMAIL,
      to: TO_EMAIL,
    })
    logger.info('Email: sending contact email', { requestId, to: TO_EMAIL, from: FROM_EMAIL })

    const subject = `New Contact Form Submission – ${data.name}`

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New Contact Lead</h2>
        <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p style="margin: 0 0 4px;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        <p style="margin: 0 0 12px;"><strong>Business Type:</strong> ${escapeHtml(data.businessType)}</p>
        <div style="padding: 12px; border-radius: 8px; background: #f8fafc;">
          <div style="font-weight: 600; margin-bottom: 6px;">Message:</div>
          <div>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</div>
        </div>
      </div>
    `

    const text = `New Contact Lead\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}\nBusiness Type: ${data.businessType}\n\nMessage:\n${data.message}`

    // Primary attempt with configured sender
    let sendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      text,
      reply_to: data.email,
    })

    // Dev-only fallback if domain not verified
    if (
      sendResult.error &&
      process.env.NODE_ENV !== 'production' &&
      (sendResult as any)?.error?.name === 'validation_error' &&
      String((sendResult as any)?.error?.error || '').toLowerCase().includes('domain is not verified')
    ) {
      logger.warn('Email: retrying with dev fallback sender due to unverified domain', { requestId })
      sendResult = await resend.emails.send({
        from: DEV_FALLBACK_FROM,
        to: TO_EMAIL,
        subject,
        html,
        text,
        reply_to: data.email,
      })
    }

    if (sendResult.error) {
      // Log full error details from Resend for diagnostics
      logger.error('Email: primary send failed', {
        requestId,
        error: sendResult.error,
        errorName: (sendResult as any)?.error?.name,
        errorMessage: (sendResult as any)?.error?.message,
      })
      throw new Error('Email send failed')
    }

    logger.info('Email: primary sent', { requestId, id: sendResult.data?.id })

    if (opts?.autoReply) {
      try {
        const autoSubject = 'Thanks for reaching out – CustomSoftwarePro'
        const autoHtml = `
          <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <p>Hi ${escapeHtml(firstName(data.name))},</p>
            <p>Thanks for reaching out! We received your message and will get back to you shortly (usually within a few hours).</p>
            <p>If you need to follow up, you can contact us at <a href="mailto:contact@customsoftwarepro.com">contact@customsoftwarepro.com</a>.</p>
            <p style="margin-top: 16px;">Best,<br/>– CustomSoftwarePro Team</p>
          </div>
        `

        const autoText = `Hi ${firstName(data.name)},\n\nThanks for reaching out! We received your message and will get back to you shortly.\n\nBest,\n– CustomSoftwarePro Team\ncontact@customsoftwarepro.com`

        const auto = await resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          subject: autoSubject,
          html: autoHtml,
          text: autoText,
          reply_to: TO_EMAIL,
        })
        if (auto.error) {
          logger.warn('Email: auto-reply failed', { requestId, error: auto.error })
        } else {
          logger.info('Email: auto-reply sent', { requestId, id: auto.data?.id })
        }
      } catch (autoErr) {
        logger.warn('Email: auto-reply exception', { requestId, error: serializeErr(autoErr) })
      }
    }

    return { ok: true, id: sendResult.data?.id }
  } catch (err) {
    logger.error('Email: sendContactEmail failed', { requestId, error: serializeErr(err) })
    throw err
  }
}

export async function sendConsultationEmail(data: ConsultationEmailInput, opts?: { requestId?: string }) {
  const requestId = opts?.requestId
  try {
    logger.info('Email: sending consultation booking', { requestId })
    const start = new Date(data.isoStart)
    const when = isNaN(start.getTime()) ? data.isoStart : start.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })

    const subject = `New 15‑min Consultation – ${data.name}`
    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin: 0 0 12px;">New Consultation Booking</h2>
        <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p style=\"margin: 0 0 4px;\"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        <p style="margin: 0 0 8px;"><strong>Requested Time:</strong> ${escapeHtml(when)}${data.timezone ? ` (${escapeHtml(data.timezone)})` : ''}</p>
        ${data.message ? `<div style=\"padding: 12px; border-radius: 8px; background: #f8fafc;\"><div style=\"font-weight: 600; margin-bottom: 6px;\">Notes:</div><div>${escapeHtml(data.message).replace(/\n/g,'<br/>')}</div></div>` : ''}
      </div>
    `
    const text = `New Consultation Booking\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}\nTime: ${when}${data.timezone ? ` (${data.timezone})` : ''}\n\nNotes:\n${data.message || ''}`

    const sendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      text,
      reply_to: data.email,
    })

    if (sendResult.error) throw new Error('Email send failed')
    logger.info('Email: consultation sent', { requestId, id: sendResult.data?.id })
    return { ok: true }
  } catch (err) {
    logger.error('Email: sendConsultationEmail failed', { requestId, error: serializeErr(err) })
    throw err
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function firstName(full: string) {
  return full.split(' ')[0] || full
}

function serializeErr(e: any) {
  if (!e) return null
  if (e instanceof Error) return { message: e.message, stack: e.stack }
  return e
} 
