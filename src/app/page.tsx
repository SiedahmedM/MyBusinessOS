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

// Memoized tab content components with error boundaries
const SolutionsTab = memo(function SolutionsTab() {
  return (
    <TabErrorBoundary tabName="Solutions">
      <div id="solutions" className="space-y-16">
        <SoftwareTypeGrid />
        <QuickROICalculator />
        <AIPlayground />
        <TechShowcase />
      </div>
    </TabErrorBoundary>
  )
})

const PortfolioTab = memo(function PortfolioTab() {
  return (
    <TabErrorBoundary tabName="Portfolio">
      <div id="portfolio" className="space-y-16">
        <CaseStudies />
      </div>
    </TabErrorBoundary>
  )
})

const ProcessTab = memo(function ProcessTab() {
  return (
    <TabErrorBoundary tabName="Process">
      <div id="process" className="space-y-16">
        <ProcessTimeline />
      </div>
    </TabErrorBoundary>
  )
})

const PricingTab = memo(function PricingTab() {
  return (
    <TabErrorBoundary tabName="Pricing">
      <div id="pricing" className="space-y-16">
        <InteractivePricingCalculator />
        <ROICalculator />
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
      <div className="min-h-screen">
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={navigateToTab}
        />
        
        {/* Hero Section - Always visible */}
        <Hero onTabChange={navigateToTab} />
        
        <main className="scroll-smooth">
          {activeTab === 'solutions' && <SolutionsTab />}
          {activeTab === 'portfolio' && <PortfolioTab />}
          {activeTab === 'process' && <ProcessTab />}
          {activeTab === 'pricing' && <PricingTab />}

          <ContactForm />
          <FloatingCTA />
        </main>
      </div>
    </ErrorBoundary>
  )
}