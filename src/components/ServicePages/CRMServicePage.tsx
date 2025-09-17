"use client"
import React from "react"
// Starry background removed per request
import { GlowCard } from "@/components/ui/GlowCard"
import { SparkleDivider } from "@/components/ui/SparkleDivider"
import { ArrowRight, CheckCircle2, LineChart, Layers, Users, CalendarCheck2, Building2, BarChart3, Waypoints, BadgeDollarSign } from "lucide-react"

import { useEffect, useRef } from 'react'

export default function CRMServicePage() {
  return (
    <div className="relative">
      {/* Hero band with stars */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(800px 400px at 50% 0%, rgba(255,213,46,.08), transparent 60%)"}}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Stop Losing Leads. Start Closing More Deals.</h1>
          <p className="text-white/80 max-w-3xl mx-auto">Custom CRM software that organizes your sales process, tracks every lead, and helps your team close more business.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a href="#crm-demo" className="btn-primary inline-flex items-center gap-2">See Live Demo <ArrowRight size={18} /></a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
            {["+35% conversion","-50% admin time","100% leads tracked"].map(t => (
              <span key={t} className="px-3 py-1 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-200">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* At-a-glance benefits (30-second summary) */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 md:-mt-10 mb-10">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {title:'Never miss a lead',desc:'Every inquiry auto-captured & routed',icon:<Users size={18}/>},
            {title:'Know what to do next',desc:'Auto tasks & reminders for your team',icon:<CalendarCheck2 size={18}/>},
            {title:'See what’s working',desc:'Live pipeline & clear performance reports',icon:<LineChart size={18}/>},
          ].map((i)=> (
            <GlowCard key={i.title}>
              <div className="p-4 flex items-start gap-3">
                <span className="text-accent-300" aria-hidden>{i.icon}</span>
                <div>
                  <div className="text-white font-semibold leading-tight">{i.title}</div>
                  <div className="text-white/80 text-sm">{i.desc}</div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      <SparkleDivider />
      {/* Sound familiar → compact chips + icon list */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Sound Familiar?</h2>
            <ul className="space-y-3 text-white/85">
              {[
                'Leads scattered across sticky notes, spreadsheets, and memory',
                'No follow-up system causing missed opportunities',
                "Can’t track which marketing efforts actually work",
                "Sales team doesn’t know who’s doing what",
                'Lost deals with no idea why they fell through',
              ].map((t)=> (
                <li key={t} className="flex items-start gap-3"><span className="mt-0.5 text-accent-300">•</span><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Here’s What Our Custom CRM Does</h2>
            <ul className="space-y-3 text-white/85">
              {[
                'Captures every lead automatically from all sources',
                'Tracks complete customer journey from first contact to close',
                'Automates follow-up sequences so nothing falls through cracks',
                'Provides real-time sales pipeline visibility',
                "Generates reports showing what’s working and what isn’t",
              ].map((t)=> (
                <li key={t} className="flex items-start gap-3"><CheckCircle2 size={18} className="text-accent-400 mt-0.5"/><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Demo with callouts */}
      <section id="crm-demo" className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <VideoPanel />
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-3">What we’ll show in the demo</h3>
            <div className="space-y-3 text-sm">
              {[
                {icon:<Layers size={16}/>,text:'Dashboard: quick actions; “Today’s Agenda” and “Recently Added Leads” update as you add items'},
                {icon:<Waypoints size={16}/>,text:'Pipeline: drag a lead between stages; open Add Lead and save'},
                {icon:<Users size={16}/>,text:'Contacts: add, search, edit a contact and save'},
                {icon:<Building2 size={16}/>,text:'Properties: filter to “Condo”, Status: Active; open a property card'},
                {icon:<CalendarCheck2 size={16}/>,text:'Calendar: add a “Showing” with contact + property; see it on the calendar'},
                {icon:<BarChart3 size={16}/>,text:'Analytics: toggle Last 6 Months vs Last Year; call out KPIs & trends'},
              ].map((i,idx)=> (
                <GlowCard key={idx}>
                  <div className="flex items-start gap-3 p-3">
                    <span className="text-accent-300 mt-0.5" aria-hidden>{i.icon}</span>
                    <span className="text-white/85">{i.text}</span>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Core CRM Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {title:'Lead management & scoring', icon:<Users size={18}/>, desc:'Capture, qualify, and prioritize high‑value leads'},
            {title:'Contact history', icon:<Layers size={18}/>, desc:'Every email, note, and call in one timeline'},
            {title:'Pipeline stages', icon:<Waypoints size={18}/>, desc:'Drag‑and‑drop deals with probability tracking'},
            {title:'Tasks & reminders', icon:<CalendarCheck2 size={18}/>, desc:'Automatic follow‑ups so nothing slips'},
            {title:'Reports & analytics', icon:<LineChart size={18}/>, desc:'See conversion, revenue, and team performance'},
            {title:'Integrations', icon:<BadgeDollarSign size={18}/>, desc:'Hook into email, calendars, accounting & more'},
          ].map(card => (
            <GlowCard key={card.title}>
              <div className="p-5">
                <div className="flex items-center gap-2 text-accent-300 mb-1">{card.icon}<span className="text-white font-medium">{card.title}</span></div>
                <p className="text-sm text-white/80">{card.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Industries We’ve Built CRM For</h2>
        <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-2">
          {['Real Estate','Professional Services','Manufacturing','Healthcare','Construction','More...'].map((t)=> (
            <GlowCard key={t}>
              <div className="text-sm px-3 py-2 text-center">{t}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-5">How We Build Your Custom CRM</h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/10" />
          {[
            'Discovery: Map your current sales process',
            'Design: Create CRM that matches your workflow',
            'Build: Develop with your team’s input',
            'Deploy: Launch with full training',
            'Support: Ongoing maintenance and updates',
          ].map((step,i)=> (
            <div key={i} className="relative mb-5 last:mb-0">
              <div className="absolute -left-[10px] top-1.5 w-3 h-3 rounded-full bg-accent-500 shadow-[0_0_0_3px_rgba(255,213,46,.15)]" />
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
                <span className="text-accent-300 font-semibold mr-2">{i+1}.</span>{step}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROI band */}
      <section className="relative py-10">
        <div className="absolute inset-0 opacity-20" style={{background:"radial-gradient(800px 400px at 50% 0%, rgba(255,213,46,.18), transparent 60%)"}}/>
        <div className="relative z-10 max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-4 text-center">
          {[
            ['35%','increase in sales conversion'],
            ['50%','reduction in admin time'],
            ['100%','leads tracked & followed up'],
          ].map(([k,v]) => (
            <GlowCard key={k}>
              <div className="px-4 py-6">
                <div className="text-4xl font-extrabold text-accent-300">{k}</div>
                <div className="text-white/80">{v}</div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-14">
        <a href="#contact" className="inline-flex btn-primary">Get Your Custom CRM Quote</a>
      </section>
    </div>
  )
}

function VideoPanel() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Try to autoplay muted on mount (tab became active)
    const tryPlay = () => {
      video.play().catch(() => {/* ignore autoplay block */})
    }
    tryPlay()

    // Play/pause based on intersection with the demo section
    const host = document.getElementById('crm-demo') || video
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.3) {
          tryPlay()
        } else {
          video.pause()
        }
      })
    }, { threshold: [0, 0.3, 1] })
    if (host) io.observe(host)

    // Pause when page/tab hidden
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
      video.pause()
    }
  }, [])

  return (
    <div className="md:col-span-8">
      <div className="relative overflow-hidden bg-black">
        {/* Slightly bigger card */}
        <div className="pt-[62%] md:pt-[58%] lg:pt-[54%]" />
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
            controlsList="nodownload noplaybackrate nofullscreen"
            disablePictureInPicture
          >
            <source src={encodeURI('/Real Estate CRM-2.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <p className="text-white/70 text-sm mt-3">This is just one example — we build CRM for any industry.</p>
    </div>
  )
}
