"use client"
import React, { useMemo, useState } from 'react'

type Step = 'pick' | 'details' | 'done'

export function Scheduler({ className = '' }: { className?: string }) {
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [step, setStep] = useState<Step>('pick')
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  const times = useMemo(() => {
    // hourly slots 9am–5pm
    const slots: string[] = []
    for (let h = 9; h <= 16; h++) {
      const label = new Date(2000, 0, 1, h, 0).toLocaleTimeString([], { hour: 'numeric' })
      const value = `${String(h).padStart(2, '0')}:00`
      slots.push(`${value}|${label}`)
    }
    return slots
  }, [])

  const canContinue = date && time

  const submit = async () => {
    setErr(null)
    if (!name || !email) {
      setErr('Please enter your name and email.')
      return
    }
    try {
      setSubmitting(true)
      const isoStart = new Date(`${date}T${time}:00`).toISOString()
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, isoStart, timezone: tz })
      })
      if (!res.ok) throw new Error('Failed to book')
      setStep('done')
    } catch (e: any) {
      setErr(e.message || 'Failed to book. Please try email option.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">Book a 15‑minute consultation</h3>
      {step === 'pick' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-white/80">Pick a date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white/80">Pick a time ({tz})</label>
            <div className="grid grid-cols-3 gap-2">
              {times.map(s=>{
                const [value, label] = s.split('|')
                const active = time===value
                return (
                  <button key={value} onClick={()=>setTime(value)} className={`px-3 py-2 rounded-lg text-sm border transition-colors ${active? 'bg-accent-500 text-black border-accent-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>{label}</button>
                )
              })}
            </div>
          </div>
          <button disabled={!canContinue} onClick={()=>setStep('details')} className={`px-4 py-2 rounded-lg font-semibold ${canContinue? 'bg-accent-500 text-black hover:bg-accent-400' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}>Continue</button>
        </div>
      )}
      {step === 'details' && (
        <div className="space-y-3">
          <div className="text-sm text-white/70">Selected: {new Date(`${date}T${time}:00`).toLocaleString([], { dateStyle:'medium', timeStyle:'short' })} ({tz})</div>
          <div className="grid md:grid-cols-2 gap-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          </div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message (optional)" rows={3} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          {err && <div className="text-sm text-red-400">{err}</div>}
          <div className="flex gap-2">
            <button onClick={()=>setStep('pick')} className="px-4 py-2 rounded-lg border border-white/20 text-white/80">Back</button>
            <button disabled={submitting} onClick={submit} className="px-4 py-2 rounded-lg bg-accent-500 text-black font-semibold hover:bg-accent-400 disabled:opacity-50">{submitting? 'Booking…' : 'Book Consultation'}</button>
          </div>
        </div>
      )}
      {step === 'done' && (
        <div className="text-accent-300 font-medium">Thanks! We’ve received your booking and will confirm by email.</div>
      )}
    </div>
  )
}

