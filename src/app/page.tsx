'use client'
import { useState, memo, useEffect, useRef } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { TabNavigation } from '@/components/TabNavigation/TabNavigation'
import { Hero } from '@/components/Hero/Hero'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'
import { TransformSection } from '@/components/Transform/TransformSection'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'
import { SoftwareTypeGrid } from '@/components/SoftwareTypeGrid/SoftwareTypeGrid'
import { ProcessTimeline } from '@/components/ProcessTimeline/ProcessTimeline'
import { InteractivePricingCalculator } from '@/components/InteractivePricingCalculator/InteractivePricingCalculator'
import { TestimonialsMarquee } from '@/components/TestimonialsMarquee/TestimonialsMarquee'
import { ErrorDisplay } from '@/components/common/ErrorDisplay'
import { TabErrorBoundary } from '@/components/common/TabErrorBoundary'
import { Footer } from '@/components/common/Footer'
import { StarsBackground } from '@/components/ui/stars-background'
import { useHashRouter } from '@/hooks/useHashRouter'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'
import { Code2, MessageSquare, Rocket } from 'lucide-react'
import React from 'react'

// Memoized tab content components with full-bleed mobile-first layouts
const HomeTab = memo(function HomeTab({ onTabChange }: { onTabChange?: (tabId: Tab['id']) => void }) {
  // Light background toggle while in Solutions > SoftwareTypeGrid through FAQ
  const [lightBg, setLightBg] = useState(false)
  const startRef = useRef<HTMLDivElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)
  const afterStart = useRef(false)

  useEffect(() => {
    const startEl = startRef.current
    if (!startEl) return

    // Turn on white when we pass the start sentinel
    const startObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          afterStart.current = true
          setLightBg(true)
        }
        // If we scroll back above the start, disable white
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          afterStart.current = false
          setLightBg(false)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' })

    // Use the Transform section as the end trigger (turn back to dark)
    const transformEl = document.getElementById('ai-playground')
    const endObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLightBg(false)
        }
        // If we scroll away from transform (upwards), restore white if we've passed start
        if (!entry.isIntersecting && afterStart.current) {
          setLightBg(true)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' })

    startObserver.observe(startEl)
    if (transformEl) endObserver.observe(transformEl)
    return () => { startObserver.disconnect(); endObserver.disconnect() }
  }, [])

  return (
    <TabErrorBoundary tabName="Home">
      <div id="home" className={`mobile-section-spacing section-transition ${lightBg ? 'solutions-light bg-white' : ''}`}>
        {/* Hero Section */}
        <Hero onTabChange={onTabChange} />

        {/* Seam-centered value props */}
        <div className="relative -mt-8 md:-mt-10 z-30">
          {/* Full-bleed stars behind value props */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw]">
            <StarsBackground starDensity={0.0002} className="opacity-35" />
          </div>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm shadow-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Code2 size={20} className="text-accent-400" />
                <h3 className="font-sans font-semibold text-white">Expert Software Engineers</h3>
              </div>
              <p className="text-sm text-white/80">
                Our engineers all have years of experience at top tech companies. You get Fortune 500-level expertise for your business.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm shadow-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={20} className="text-accent-400" />
                <h3 className="font-sans font-semibold text-white">No Account Managers, No Middlemen</h3>
              </div>
              <p className="text-sm text-white/80">
                Work directly with the actual engineer building your software. Unlike agencies, you get immediate answers and real technical expertise.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm shadow-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Rocket size={20} className="text-accent-400" />
                <h3 className="font-sans font-semibold text-white">Enterprise-Grade Architecture</h3>
              </div>
              <p className="text-sm text-white/80">
                We build software the same way Big Tech does—scalable, secure, and maintainable. No agency shortcuts or technical debt.
              </p>
            </div>
          </div>
        </div>
        
        {/* Start sentinel: switch to white background around solutions + FAQ */}
        <div ref={startRef} aria-hidden className="h-px w-px opacity-0" />

        {/* Software Type Grid - Full width with background */}
        <SoftwareTypeGrid />

        {/* End trigger is the Transform section itself; no extra sentinel needed here */}
        
        {/* Transformation Section (replaces AI Builder) */}
        <div className="ai-playground-mobile section-transition">
          <div className="content-wrapper">
            <TransformSection />
          </div>
        </div>
        
        {/* Client Testimonials embedded above in TransformSection */}
      </div>
    </TabErrorBoundary>
  )
})

const ProcessTab = memo(function ProcessTab() {
  return (
    <TabErrorBoundary tabName="Process">
      <div id="process" className="mobile-section-spacing section-transition">
        {/* Process Timeline - Clean white section */}
        <div className="process-timeline-mobile section-transition">
          <div className="timeline-container">
            <ProcessTimeline />
          </div>
        </div>
      </div>
    </TabErrorBoundary>
  )
})

// Pricing tab removed per request

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const { activeTab, navigateToTab } = useHashRouter('home')

  logger.info('Home: Rendering main page', { activeTab })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (error) {
    return (
      <ErrorBoundary>
        <ErrorDisplay 
          error={error} 
          onRetry={() => setError(null)}
          className="m-4"
        />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white mobile-full-width transition-colors duration-500">
        {/* Mobile-optimized navigation - Full width */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={navigateToTab}
          className="nav-mobile-full mobile-touch"
        />
        
        {/* Main content with full-bleed sections */}
        <main className="scroll-smooth">
          {/* Tab content sections - 3-tab system */}
          {activeTab === 'home' && <HomeTab onTabChange={navigateToTab} />}
          {activeTab === 'process' && <ProcessTab />}
          {activeTab === 'crm' && (
            <div id="crm" className="mobile-section-spacing section-transition">
              <TabErrorBoundary tabName="Custom CRM Systems">
                <ServicePage type="crm" />
              </TabErrorBoundary>
            </div>
          )}
          {activeTab === 'erp' && (
            <div id="erp" className="mobile-section-spacing section-transition">
              <TabErrorBoundary tabName="Custom ERP Solutions">
                <ServicePage type="erp" />
              </TabErrorBoundary>
            </div>
          )}
          {activeTab === 'automation' && (
            <div id="automation" className="mobile-section-spacing section-transition">
              <TabErrorBoundary tabName="Business Process Automation">
                <ServicePage type="automation" />
              </TabErrorBoundary>
            </div>
          )}
          {/* Service tabs will render below (placeholders for now) */}
          {/* Pricing tab removed */}

          {/* Contact section - Full width with background */}
          <div className="contact-form-mobile section-transition">
            <div className="form-container">
              <ContactForm />
            </div>
          </div>
          
          {/* Mobile-optimized floating CTA */}
          <FloatingCTA className="mobile-touch" />
        </main>
        
        {/* Footer */}
        <Footer year={new Date().getFullYear()} />
      </div>
    </ErrorBoundary>
  )
}

// Lightweight service page renderer (placeholder content)
function ServicePage({ type }: { type: 'crm' | 'erp' | 'automation' }) {
  const content = {
    crm: {
      hero: 'Stop Losing Leads. Start Closing More Deals.',
      desc: 'We design CRM systems that organize leads, automate follow-ups, and provide complete pipeline visibility for smarter decisions.',
      problems: [
        'Lost leads and missed follow-ups',
        'No visibility into the sales pipeline',
        'Scattered customer information and notes'
      ],
      solution: [
        'Lead capture & assignment',
        'Sales pipeline and activity tracking',
        'Customer database with interaction history',
        'Dashboards and reporting'
      ],
      features: [
        'Kanban pipelines and custom stages',
        'Automated reminders and sequences',
        'Role-based permissions',
        'Email/calendar integration',
        'Quote/Invoice workflow (optional)'
      ],
      process: ['Discovery & mapping', 'Design & prototype', 'Development', 'Testing & training', 'Launch & support'],
      roi: [
        '25–40% increase in lead-to-close rate',
        'Save 5–10 hours/week on admin tasks',
        'Forecast accuracy improves across team'
      ],
      demoImages: ['/images/CustomCRM1.webp'],
      stack: ['Next.js', 'TypeScript', 'Postgres/Supabase', 'Tailwind CSS', 'Node.js'],
      faq: [
        { q: 'How long does a custom CRM take?', a: 'Most builds take 4–6 weeks depending on scope.' },
        { q: 'Can we migrate existing data?', a: 'Yes. We can import leads, contacts, and notes from spreadsheets or CRMs.' }
      ]
    },
    erp: {
      hero: 'Connect Your Entire Business in One System',
      desc: 'Unify inventory, finance, HR, and operations with a tailored ERP that matches your workflows—not the other way around.',
      problems: [
        'Disconnected systems and duplicate entry',
        'No real-time visibility across teams',
        'Manual, error-prone processes'
      ],
      solution: [
        'Inventory and order management',
        'Accounting integrations',
        'HR & payroll workflows',
        'Business intelligence dashboards'
      ],
      features: [
        'Multi-warehouse & BOM support',
        'Approval chains & audit logs',
        'Role permissions & SSO',
        'APIs for vendor/customer systems',
        'Data warehouse & analytics connectors'
      ],
      process: ['Process mapping', 'Architecture design', 'Module development', 'Integrations & QA', 'Rollout & training'],
      roi: [
        '30–50% reduction in manual entry',
        'Real-time operational insights',
        'Better on-time fulfillment rate'
      ],
      demoImages: ['/images/ai-business-assistant.webp'],
      stack: ['Next.js', 'TypeScript', 'Postgres', 'Supabase/Prisma', 'Airflow/DBT (optional)'],
      faq: [
        { q: 'Can we integrate QuickBooks or NetSuite?', a: 'Yes. We regularly integrate accounting and ERP platforms.' },
        { q: 'Do you support multi-location?', a: 'Yes. We can support multiple sites and warehouses.' }
      ]
    },
    automation: {
      hero: 'Eliminate Manual Work. Focus on Growth.',
      desc: 'Automate repetitive tasks, approvals, and document processing with reliable, scalable workflows—no more bottlenecks.',
      problems: [
        'Repetitive tasks and approval delays',
        'Human errors and inconsistent processes',
        'Slow turnaround times'
      ],
      solution: [
        'Workflow builders and rule engines',
        'Approval systems and notifications',
        'Document and email automation'
      ],
      features: [
        'Drag-and-drop process builder',
        'SLA timers, escalations, and reminders',
        'Integrations (Slack, email, webhooks)',
        'Audit trails and analytics',
        'RPA/AI add-ons for document parsing'
      ],
      process: ['Workflow mapping', 'Prototype & iterate', 'Automate & integrate', 'Pilot & refine', 'Launch & monitor'],
      roi: [
        'Save 10–30 hours/week across the team',
        'Reduce errors by 60–80%',
        'Faster approvals and happier customers'
      ],
      demoImages: ['/images/ISS1.webp'],
      stack: ['Next.js', 'Node.js', 'Supabase', 'Temporal/Queues', 'OpenAI (optional)'],
      faq: [
        { q: 'Do you support no-code workflow tools?', a: 'Yes. We can integrate with tools or build a tailored flow when needed.' },
        { q: 'Can we start small?', a: 'Absolutely. We often begin with one process and expand.' }
      ]
    }
  }[type]

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  )

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* 1. Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{content.hero}</h1>
        <p className="text-white/80 max-w-3xl mx-auto">{content.desc}</p>
      </section>

      {/* 2. Problem Statement */}
      <Section title="The Problem">
        <ul className="grid md:grid-cols-3 gap-4 text-sm text-white/85">
          {content.problems.map((p) => (
            <li key={p} className="rounded-xl border border-white/10 bg-white/5 p-4">{p}</li>
          ))}
        </ul>
      </Section>

      {/* 3. Solution Overview */}
      <Section title="Our Solution">
        <ul className="grid md:grid-cols-4 gap-4 text-sm text-white/85">
          {content.solution.map((s) => (
            <li key={s} className="rounded-xl border border-white/10 bg-white/5 p-4">{s}</li>
          ))}
        </ul>
      </Section>

      {/* 4. Features & Capabilities */}
      <Section title="Features & Capabilities">
        <ul className="grid md:grid-cols-3 gap-4 text-sm text-white/85">
          {content.features.map((f) => (
            <li key={f} className="rounded-xl border border-white/10 bg-white/5 p-4">{f}</li>
          ))}
        </ul>
      </Section>

      {/* 5. How It Works */}
      <Section title="How It Works">
        <ol className="grid md:grid-cols-5 gap-4 text-sm text-white/85">
          {content.process.map((step, i) => (
            <li key={step} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-accent-300 font-semibold mb-1">{i + 1}</div>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      {/* 6. ROI / Benefits */}
      <Section title="ROI & Benefits">
        <ul className="grid md:grid-cols-3 gap-4 text-sm text-white/85">
          {content.roi.map((r) => (
            <li key={r} className="rounded-xl border border-white/10 bg-white/5 p-4">{r}</li>
          ))}
        </ul>
      </Section>

      {/* 7. Demo / Screenshots */}
      <Section title="Demo & Screenshots">
        <div className="grid md:grid-cols-2 gap-4">
          {content.demoImages.map((src) => (
            <div key={src} className="relative rounded-xl overflow-hidden border border-white/10 bg-white">
              <div className="pt-[60%]" />
              <img src={src} alt="Demo screenshot" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </Section>

      {/* 8. Technology Stack */}
      <Section title="Technology Stack">
        <div className="flex flex-wrap gap-2">
          {content.stack.map((t) => (
            <span key={t} className="text-sm px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">{t}</span>
          ))}
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section title="Frequently Asked Questions">
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
          {content.faq.map((f) => (
            <details key={f.q} className="p-4">
              <summary className="cursor-pointer font-medium text-white/95">{f.q}</summary>
              <p className="mt-2 text-sm text-white/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 10. CTA */}
      <section className="text-center">
        <a href="#contact" className="inline-flex btn-primary">Get Your Custom {type === 'crm' ? 'CRM' : type === 'erp' ? 'ERP' : 'Automation'} Quote</a>
      </section>
    </div>
  )
}
