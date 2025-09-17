"use client"
import React from "react"
// Starry background removed per request
import { GlowCard } from "@/components/ui/GlowCard"
import { SparkleDivider } from "@/components/ui/SparkleDivider"
import { Workflow, Zap, MailCheck, FileText, Clock, PlugZap, CheckCircle2 } from "lucide-react"

export default function AutomationServicePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(900px 450px at 50% 0%, rgba(255,213,46,.10), transparent 60%)"}}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Eliminate Manual Work. Focus on Growth.</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Automate repetitive tasks, approvals, and document processing with reliable, scalable workflows.</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            {["Instant approvals","Zero re‑entry","24/7 automations"].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-200 inline-block">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <SparkleDivider />

      {/* Flow diagram (simple) */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">What We Automate</h2>
        <div className="grid md:grid-cols-4 gap-4 items-stretch">
          {[
            {title:'Document intake', icon:<FileText size={18}/>},
            {title:'Rules & approvals', icon:<Workflow size={18}/>},
            {title:'Notifications & tasks', icon:<MailCheck size={18}/>},
            {title:'System updates', icon:<PlugZap size={18}/>},
          ].map((n,i)=> (
            <GlowCard key={n.title}><div className="p-4 text-center h-full flex flex-col justify-center items-center gap-2"><div className="text-accent-300">{n.icon}</div><div className="text-white/90 font-semibold">{n.title}</div></div></GlowCard>
          ))}
        </div>
        <p className="text-white/70 text-sm mt-3">We connect your email, forms, CRM, accounting, storage and more — then automate the hand‑offs between them.</p>
      </section>

      {/* Problem → Solution */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Before Automation</h2>
          <ul className="space-y-3 text-white/85">
            {[
              'Hours spent on repetitive data entry',
              'Approval delays and status confusion',
              'Manual document processing',
              'Too many tools; nothing connected',
            ].map(li => <li key={li} className="flex gap-3 items-start"><span className="mt-0.5 text-accent-300">•</span><span>{li}</span></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">After Automation</h2>
          <ul className="space-y-3 text-white/85">
            {[
              'Instant triage with rules & templates',
              'Approvals that route themselves',
              'Tasks auto‑created for the right person',
              'Systems stay in sync — no re‑entry',
            ].map(li => <li key={li} className="flex gap-3 items-start"><CheckCircle2 className="text-accent-300" size={18}/><span>{li}</span></li>)}
          </ul>
        </div>
      </section>

      {/* Example workflows */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Example Workflows</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {title:'Invoice automation', desc:'Extract, approve, sync to accounting, notify vendor'},
            {title:'Lead intake', desc:'Capture, qualify, assign, follow‑ups scheduled'},
            {title:'Onboarding', desc:'Checklists, docs, accounts, access in one run'},
          ].map(card => (
            <GlowCard key={card.title}><div className="p-4"><div className="text-white font-medium mb-1">{card.title}</div><p className="text-sm text-white/80">{card.desc}</p></div></GlowCard>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-3 text-center">
        {[['-60%','manual errors'],['10–30 hrs','saved each week'],['Faster','approvals & hand‑offs']].map(([k,v]) => (
          <GlowCard key={k}><div className="px-4 py-6"><div className="text-4xl font-extrabold text-accent-300">{k}</div><div className="text-white/80">{v}</div></div></GlowCard>
        ))}
      </section>

      <section className="text-center pb-14">
        <a href="#contact" className="btn-primary inline-flex items-center gap-2">Automate My Process <Zap size={18}/></a>
      </section>
    </div>
  )
}
