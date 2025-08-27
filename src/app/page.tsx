'use client'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { Hero } from '@/components/Hero/Hero'
import { TechShowcase } from '@/components/TechShowcase/TechShowcase'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'
import { AIPlayground } from '@/components/AIPlayground/AIPlayground'
import { CaseStudies } from '@/components/CaseStudies/CaseStudies'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'

export default function Home() {
  console.log('Home: Rendering main page');

  return (
    <ErrorBoundary>
      <main className="scroll-smooth">
        <Hero />
        <TechShowcase />
        <ROICalculator />
        <AIPlayground />
        <CaseStudies />
        <ContactForm />
        <FloatingCTA />
      </main>
    </ErrorBoundary>
  )
}