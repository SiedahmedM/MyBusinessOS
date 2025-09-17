"use client"
import React from "react"
// Starry background removed per request
import { GlowCard } from "@/components/ui/GlowCard"
import { SparkleDivider } from "@/components/ui/SparkleDivider"
import { Building2, Boxes, CreditCard, Users, ChartBar, Workflow, Link2, ShieldCheck, Factory, Store } from "lucide-react"

export default function ERPServicePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(900px 450px at 50% 0%, rgba(255,213,46,.10), transparent 60%)"}}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Connect Your Entire Business in One System</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Inventory, finance, HR, operations — unified into one ERP that matches how you work.</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            {[['Real‑time visibility','ChartBar'],['Fewer manual tasks','Workflow'],['Fewer mistakes','ShieldCheck']].map(([t]) => (
              <span key={t as string} className="px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-200 inline-block">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <SparkleDivider />

      {/* At-a-glance modules */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">ERP Modules — Pick What You Need</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {icon:<Boxes size={18}/>, title:'Inventory & Supply Chain', desc:'Multi‑warehouse, BOMs, purchase & fulfillment'},
            {icon:<CreditCard size={18}/>, title:'Finance & Accounting', desc:'Sync with QuickBooks; invoices, AP/AR, approvals'},
            {icon:<Users size={18}/>, title:'HR & Payroll', desc:'Onboarding, timesheets, payroll exports'},
            {icon:<Workflow size={18}/>, title:'Workflow Automation', desc:'Approvals, rules, and alerts across teams'},
            {icon:<ChartBar size={18}/>, title:'BI Dashboards', desc:'KPIs for operations, sales, and finance'},
            {icon:<Link2 size={18}/>, title:'Integrations', desc:'Vendors, ecommerce, logistics, and more'},
          ].map((m) => (
            <GlowCard key={m.title}><div className="p-5"><div className="flex items-center gap-2 text-accent-300 mb-1">{m.icon}<span className="text-white font-medium">{m.title}</span></div><p className="text-sm text-white/80">{m.desc}</p></div></GlowCard>
          ))}
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">What’s Hard Today</h2>
          <ul className="space-y-3 text-white/85">
            {[
              'Data lives in separate systems; no single source of truth',
              'Manual re‑entry between apps; errors & delays',
              'No real‑time view of stock, orders, and cash',
              'Reports take days to build',
            ].map(li => <li key={li} className="flex gap-3 items-start"><span className="mt-0.5 text-accent-300">•</span><span>{li}</span></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">How Our ERP Fixes It</h2>
          <ul className="space-y-3 text-white/85">
            {[
              'One database across inventory, finance, HR, and ops',
              'AP/AR and purchase flows auto‑reconcile and post',
              'Live dashboards for stock, revenue, and fulfillment',
              'Instant reports — what happened and why',
            ].map(li => <li key={li} className="flex gap-3 items-start"><span className="mt-0.5 text-accent-300">✓</span><span>{li}</span></li>)}
          </ul>
        </div>
      </section>

      {/* Screens / Demo placeholders by industry */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">See Example Setups</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {title:'Manufacturing ERP', icon:<Factory size={18}/>, note:'BOMs, work orders, MRP'},
            {title:'Wholesale & Retail', icon:<Store size={18}/>, note:'Multi‑warehouse inventory, POS sync'},
            {title:'Professional Services', icon:<Building2 size={18}/>, note:'Projects, time & billing'},
          ].map(card => (
            <GlowCard key={card.title}><div className="p-4">
              <div className="flex items-center gap-2 text-accent-300 mb-1">{card.icon}<span className="text-white font-medium">{card.title}</span></div>
              {/* Demo placeholder removed */}
              <p className="text-white/70 text-sm mt-2">{card.note}</p>
            </div></GlowCard>
          ))}
        </div>
      </section>

      {/* Process & ROI */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Implementation Process</h2>
          <ol className="space-y-3 text-white/85">
            {['Process mapping','Architecture & integrations','Module development','Data migration & QA','Rollout, training, and support'].map((s,i)=> (
              <li key={s} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"><span className="text-accent-300 font-semibold mr-2">{i+1}.</span>{s}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Results Teams Typically See</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[['-50%','manual entry'],['↑','on‑time fulfillment'],['Live','ops visibility']].map(([k,v])=> (
              <GlowCard key={k}><div className="px-3 py-5"><div className="text-3xl font-extrabold text-accent-300">{k}</div><div className="text-white/80 text-sm">{v}</div></div></GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center pb-14">
        <a href="#contact" className="btn-primary inline-flex">Get Your Custom ERP Quote</a>
      </section>
    </div>
  )
}
