"use client"
import { useState } from 'react'
import { Mail, Calendar } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { Scheduler } from './Scheduler'

export function ContactOptionsSection() {
  const [mode, setMode] = useState<'form' | 'schedule'>('form')

  return (
    <section id="contact" className="section-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Get in touch</h2>

        {/* Simple, prominent email pill */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <a
            href="mailto:hello@customsoftwarepro.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-black font-semibold hover:bg-accent-400 shadow-lg shadow-black/20"
          >
            <Mail size={18} /> hello@customsoftwarepro.com
          </a>
          <p className="text-xs text-white/60">Fast replies during business hours</p>
        </div>

        {/* Mode switch: Message OR Book Call */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10" role="tablist" aria-label="Contact options">
            <button
              type="button"
              onClick={() => setMode('form')}
              aria-pressed={mode === 'form'}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${mode === 'form' ? 'bg-accent-500 text-black' : 'text-white/80 hover:text-white'}`}
            >
              <Mail size={16} /> Message
            </button>
            <button
              type="button"
              onClick={() => setMode('schedule')}
              aria-pressed={mode === 'schedule'}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${mode === 'schedule' ? 'bg-accent-500 text-black' : 'text-white/80 hover:text-white'}`}
            >
              <Calendar size={16} /> Book Call
            </button>
          </div>
        </div>

        {/* Single pane content */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            {mode === 'form' ? (
              <ContactForm compact />
            ) : (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-accent-300" size={20} />
                  <div className="text-lg font-semibold">Schedule a free 15‑min call</div>
                </div>
                <Scheduler />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactOptionsSection
