'use client'
import { useState, memo } from 'react'
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
import { QuickROICalculator } from '@/components/QuickROICalculator/QuickROICalculator'
import { VisualProjectShowcase } from '@/components/VisualProjectShowcase/VisualProjectShowcase'
import { ErrorDisplay } from '@/components/common/ErrorDisplay'
import { TabErrorBoundary } from '@/components/common/TabErrorBoundary'
import { Footer } from '@/components/common/Footer'
import { useHashRouter } from '@/hooks/useHashRouter'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'

// Memoized tab content components with full-bleed mobile-first layouts
const SolutionsTab = memo(function SolutionsTab({ onTabChange }: { onTabChange?: (tabId: Tab['id']) => void }) {
  return (
    <TabErrorBoundary tabName="Solutions">
      <div id="solutions" className="mobile-section-spacing">
        {/* Hero Section - Only on Solutions tab */}
        <Hero onTabChange={onTabChange} />
        
        {/* Software Type Grid - Full width with background */}
        <SoftwareTypeGrid />
        
        {/* Visual Project Showcase - Replaces Portfolio tab content */}
        <VisualProjectShowcase />

        {/* ROI Calculator - Full width section */}
        <div className="roi-calculator-mobile">
          <div className="calculator-content">
            <QuickROICalculator />
          </div>
        </div>
        
        {/* AI Playground - Immersive purple section */}
        <div className="ai-playground-mobile">
          <div className="content-wrapper">
            <AIPlayground />
          </div>
        </div>
        
        {/* Tech Showcase - Simplified, no code display */}
        <div className="tech-showcase-mobile">
          <TechShowcase />
        </div>
      </div>
    </TabErrorBoundary>
  )
})

const ProcessTab = memo(function ProcessTab() {
  return (
    <TabErrorBoundary tabName="Process">
      <div id="process" className="mobile-section-spacing">
        {/* Process Timeline - Clean white section */}
        <div className="process-timeline-mobile">
          <div className="timeline-container">
            <ProcessTimeline />
          </div>
        </div>
      </div>
    </TabErrorBoundary>
  )
})

const PricingTab = memo(function PricingTab() {
  return (
    <TabErrorBoundary tabName="Pricing">
      <div id="pricing" className="mobile-section-spacing">
        {/* Interactive Pricing Calculator - Light section */}
        <div className="pricing-calculator-mobile">
          <div className="calculator-wrapper">
            <InteractivePricingCalculator />
          </div>
        </div>
        
        {/* ROI Calculator - Dark gradient section */}
        <div className="roi-calculator-mobile">
          <div className="calculator-content">
            <ROICalculator />
          </div>
        </div>
      </div>
    </TabErrorBoundary>
  )
})

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const { activeTab, navigateToTab } = useHashRouter('solutions')

  logger.info('Home: Rendering main page', { activeTab })

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
      <div className="min-h-screen bg-white mobile-full-width">
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
          {activeTab === 'pricing' && <PricingTab />}

          {/* Contact section - Full width with background */}
          <div className="contact-form-mobile">
            <div className="form-container">
              <ContactForm />
            </div>
          </div>
          
          {/* Mobile-optimized floating CTA */}
          <FloatingCTA className="mobile-touch" />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  )
}