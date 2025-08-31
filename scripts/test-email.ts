#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load .env first
dotenv.config()
// If RESEND_API_KEY is not set, try .env.local
if (!process.env.RESEND_API_KEY) {
  const localPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(localPath)) {
    dotenv.config({ path: localPath })
  }
}

import { sendContactEmail } from '../src/lib/email'

async function main() {
  const name = process.argv[2] || 'Test User'
  const email = process.argv[3] || 'you@example.com'
  const businessType = process.argv[4] || 'test'
  const message = process.argv.slice(5).join(' ') || 'This is a test message from scripts/test-email.ts'

  console.log('Sending test email...')
  const res = await sendContactEmail({ name, email, businessType, message }, { autoReply: false })
  console.log('Sent:', res)
}

main().catch((err) => {
  console.error('Test email failed:', err)
  process.exit(1)
}) 