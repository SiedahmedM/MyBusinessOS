"use client"
import { Mail, Calendar } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { Scheduler } from './Scheduler'

export function ContactOptionsSection() {
  return (
    <section id="contact" className="section-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Get in touch</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Direct email */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-accent-300" size={20} />
              <div className="text-lg font-semibold">Reach out directly</div>
            </div>
            <p className="text-white/80 text-sm mb-4">Prefer email? We usually respond within a few hours.</p>
            <a href="mailto:contact@customsoftwarepro.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-black font-semibold hover:bg-accent-400">
              contact@customsoftwarepro.com
            </a>
          </div>

          {/* Contact form (current) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <ContactForm compact />
          </div>

          {/* Scheduler */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-accent-300" size={20} />
              <div className="text-lg font-semibold">Schedule a free 15‑min call</div>
            </div>
            <Scheduler />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactOptionsSection
