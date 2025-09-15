'use client'
import { useState, memo, useEffect, useRef } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { TabNavigation } from '@/components/TabNavigation/TabNavigation'
import { Hero } from '@/components/Hero/Hero'
import { TechShowcase } from '@/components/TechShowcase/TechShowcase'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'
import { AIPlayground } from '@/components/AIPlayground/AIPlayground'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'
import { SoftwareTypeGrid } from '@/components/SoftwareTypeGrid/SoftwareTypeGrid'
import { ProcessTimeline } from '@/components/ProcessTimeline/ProcessTimeline'
import { InteractivePricingCalculator } from '@/components/InteractivePricingCalculator/InteractivePricingCalculator'
import { FAQSection } from '@/components/FAQ/FAQSection'
import { TestimonialsMarquee } from '@/components/TestimonialsMarquee/TestimonialsMarquee'
import { ErrorDisplay } from '@/components/common/ErrorDisplay'
import { TabErrorBoundary } from '@/components/common/TabErrorBoundary'
import { Footer } from '@/components/common/Footer'
import { useHashRouter } from '@/hooks/useHashRouter'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'

// Memoized tab content components with full-bleed mobile-first layouts
const SolutionsTab = memo(function SolutionsTab({ onTabChange }: { onTabChange?: (tabId: Tab['id']) => void }) {
  // Light background toggle while in Solutions > SoftwareTypeGrid through FAQ
  const [lightBg, setLightBg] = useState(false)
  const startRef = useRef<HTMLDivElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const startEl = startRef.current
    const endEl = endRef.current
    if (!startEl || !endEl) return

    // Activate white background only when start is well within view.
    const startObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLightBg(true)
        }
        // If user scrolls back above the start, disable
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setLightBg(false)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' })

    const endObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setLightBg(false)
      })
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' })

    startObserver.observe(startEl)
    endObserver.observe(endEl)
    return () => {
      startObserver.disconnect()
      endObserver.disconnect()
    }
  }, [])

  return (
    <TabErrorBoundary tabName="Solutions">
      <div id="solutions" className={`mobile-section-spacing section-transition ${lightBg ? 'solutions-light bg-white' : ''}`}>
        {/* Hero Section */}
        <Hero onTabChange={onTabChange} />
        
        {/* Software Type Grid - Full width with background */}
        {/* start sentinel for light background */}
        <div ref={startRef} aria-hidden className="h-px w-px opacity-0" />
        <SoftwareTypeGrid />
        
        {/* Removed Recent Projects section as requested */}

        {/* FAQ Section - replaces ROI calculator */}
        <div className="faq-mobile section-transition">
          {/* end sentinel for light background */}
          <div ref={endRef} aria-hidden className="h-px w-px opacity-0" />
          <div className="faq-content">
            <FAQSection />
          </div>
        </div>
        
        {/* AI Playground - Immersive purple section */}
        <div className="ai-playground-mobile section-transition">
          <div className="content-wrapper">
            <AIPlayground />
          </div>
        </div>
        
        {/* Tech Showcase - Simplified, no code display */}
        <div className="tech-showcase-mobile section-transition">
          <TechShowcase />
        </div>

        {/* Client Testimonials */}
        <TestimonialsMarquee />
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
  const { activeTab, navigateToTab } = useHashRouter('solutions')

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
          {activeTab === 'solutions' && <SolutionsTab onTabChange={navigateToTab} />}
          {activeTab === 'process' && <ProcessTab />}
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
