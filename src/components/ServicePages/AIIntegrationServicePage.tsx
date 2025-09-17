"use client"
import React from "react"
// Starry background removed per request
import { GlowCard } from "@/components/ui/GlowCard"
import { SparkleDivider } from "@/components/ui/SparkleDivider"
import { Bot, MessageSquare, Brain, BarChart3, FileText, PlugZap } from "lucide-react"

export default function AIIntegrationServicePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(900px 450px at 50% 0%, rgba(255,213,46,.10), transparent 60%)"}}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Bring AI Into Your Business</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Chatbots, data insights, and smart automations — tailored to your workflows.</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            {["24/7 customer replies","Instant insights","Predictive analytics"].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-200 inline-block">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <SparkleDivider />

      {/* Use cases */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">Where AI Helps Most</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {icon:<MessageSquare size={18}/>, title:'Customer Support', desc:'Website & internal chat, canned + smart answers'},
            {icon:<FileText size={18}/>, title:'Docs & Email', desc:'Summarize, draft, route, and extract data'},
            {icon:<BarChart3 size={18}/>, title:'Insights & Forecasts', desc:'Trends, anomalies, predictions from your data'},
          ].map(card => (
            <GlowCard key={card.title}><div className="p-5"><div className="flex items-center gap-2 text-accent-300 mb-1">{card.icon}<span className="text-white font-medium">{card.title}</span></div><p className="text-sm text-white/80">{card.desc}</p></div></GlowCard>
          ))}
        </div>
      </section>

      {/* Integrations (demo placeholder removed) */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-lg font-semibold mb-4">We integrate with</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {['OpenAI','Anthropic','Pinecone','Postgres','Google Drive','Slack','Gmail','HubSpot'].map(t => (
            <GlowCard key={t}><div className="px-3 py-2 text-center text-white/85">{t}</div></GlowCard>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">How We Add AI — Safely</h2>
        <div className="grid md:grid-cols-4 gap-3 text-sm">
          {[
            'Identify quick‑win use cases',
            'Choose model & data strategy',
            'Prototype with guardrails',
            'Integrate & measure ROI',
          ].map((s,i)=> (
            <GlowCard key={s}><div className="px-3 py-3"><span className="text-accent-300 font-semibold mr-2">{i+1}.</span><span className="text-white/85">{s}</span></div></GlowCard>
          ))}
        </div>
      </section>

      {/* ROI */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-3 text-center">
        {[['-70%','first‑response time'],['+24/7','coverage'],['↓','manual triage']].map(([k,v]) => (
          <GlowCard key={k}><div className="px-4 py-6"><div className="text-4xl font-extrabold text-accent-300">{k}</div><div className="text-white/80">{v}</div></div></GlowCard>
        ))}
      </section>

      <section className="text-center pb-14">
        <a href="#contact" className="btn-primary inline-flex items-center gap-2">Explore AI Integration <Bot size={18}/></a>
      </section>
    </div>
  )
}
