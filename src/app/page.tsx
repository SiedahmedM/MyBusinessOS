'use client'
import { useState, memo } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { TabNavigation } from '@/components/TabNavigation/TabNavigation'
import { Hero } from '@/components/Hero/Hero'
import { TechShowcase } from '@/components/TechShowcase/TechShowcase'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'
import { AIPlayground } from '@/components/AIPlayground/AIPlayground'
import { CaseStudies } from '@/components/CaseStudies/CaseStudies'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'
import { SoftwareTypeGrid } from '@/components/SoftwareTypeGrid/SoftwareTypeGrid'
import { ProcessTimeline } from '@/components/ProcessTimeline/ProcessTimeline'
import { InteractivePricingCalculator } from '@/components/InteractivePricingCalculator/InteractivePricingCalculator'
import { QuickROICalculator } from '@/components/QuickROICalculator/QuickROICalculator'
import { ErrorDisplay } from '@/components/common/ErrorDisplay'
import { TabErrorBoundary } from '@/components/common/TabErrorBoundary'
import { useHashRouter } from '@/hooks/useHashRouter'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'

// Memoized tab content components with error boundaries and mobile-first layouts
const SolutionsTab = memo(function SolutionsTab() {
  return (
    <TabErrorBoundary tabName="Solutions">
      <div id="solutions" className="mobile-container mobile-section space-y-8 sm:space-y-12 lg:space-y-16">
        <SoftwareTypeGrid className="mobile-section" />
        <div className="mobile-section bg-neutral-50 rounded-2xl">
          <QuickROICalculator />
        </div>
        <div className="mobile-section">
          <AIPlayground />
        </div>
        <div className="mobile-section bg-gradient-to-br from-accent-50 to-accent-100/50 rounded-2xl">
          <TechShowcase />
        </div>
      </div>
    </TabErrorBoundary>
  )
})

const PortfolioTab = memo(function PortfolioTab() {
  return (
    <TabErrorBoundary tabName="Portfolio">
      <div id="portfolio" className="mobile-container mobile-section space-y-8 sm:space-y-12 lg:space-y-16">
        <div className="mobile-section">
          <CaseStudies />
        </div>
      </div>
    </TabErrorBoundary>
  )
})

const ProcessTab = memo(function ProcessTab() {
  return (
    <TabErrorBoundary tabName="Process">
      <div id="process" className="mobile-container mobile-section space-y-8 sm:space-y-12 lg:space-y-16">
        <div className="mobile-section">
          <ProcessTimeline />
        </div>
      </div>
    </TabErrorBoundary>
  )
})

const PricingTab = memo(function PricingTab() {
  return (
    <TabErrorBoundary tabName="Pricing">
      <div id="pricing" className="mobile-container mobile-section space-y-8 sm:space-y-12 lg:space-y-16">
        <div className="mobile-section">
          <InteractivePricingCalculator />
        </div>
        <div className="mobile-section bg-neutral-50 rounded-2xl">
          <ROICalculator />
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
      <div className="min-h-screen bg-white">
        {/* Mobile-optimized navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={navigateToTab}
          className="mobile-touch"
        />
        
        {/* Hero Section - Mobile-first with better spacing */}
        <Hero onTabChange={navigateToTab} />
        
        {/* Main content with mobile-first containers */}
        <main className="scroll-smooth relative">
          {/* Tab content sections */}
          <div className="mobile-section">
            {activeTab === 'solutions' && <SolutionsTab />}
            {activeTab === 'portfolio' && <PortfolioTab />}
            {activeTab === 'process' && <ProcessTab />}
            {activeTab === 'pricing' && <PricingTab />}
          </div>

          {/* Contact section with mobile-first layout */}
          <div className="mobile-container mobile-section bg-gradient-to-br from-neutral-50 to-neutral-100/50">
            <ContactForm />
          </div>
          
          {/* Mobile-optimized floating CTA */}
          <FloatingCTA className="mobile-touch" />
        </main>
      </div>
    </ErrorBoundary>
  )
}