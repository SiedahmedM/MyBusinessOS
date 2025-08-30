'use client'
import { useState, useCallback, useEffect } from 'react'
import { logger } from '@/lib/logger'
import { StarsBackground } from '@/components/ui/stars-background'


interface PricingCalculatorState {
  softwareType: string
  complexity: 'standard' | 'medium' | 'high'
  features: string[]
  timeline: 'rush' | 'standard' | 'flexible'
  support: 'basic' | 'premium'
}

interface PricingResult {
  basePrice: number
  totalPrice: number
  timeline: string
  roi: string
  paybackPeriod: string
}

const softwareTypes = [
  { id: 'ecommerce', name: 'E-Commerce Platform', minPrice: 2000, maxPrice: 8000 },
  { id: 'agency-to-saas', name: 'Agency to SaaS', minPrice: 3000, maxPrice: 10000 },
  { id: 'workflow-automation', name: 'Workflow Automation', minPrice: 3000, maxPrice: 20000 },
  { id: 'mobile-app', name: 'Mobile App', minPrice: 4000, maxPrice: 20000 },
  { id: 'ai-integration', name: 'AI Integration', minPrice: 4000, maxPrice: 20000 },
  { id: 'business-management', name: 'Business Management System', minPrice: 5000, maxPrice: 20000 }
]

const complexityOptions = {
  standard: { add: 0, label: 'Standard Complexity', description: 'Core features and ready-to-grow architecture' },
  medium: { add: 2000, label: 'Medium Complexity', description: 'Custom workflows and integrations' },
  high: {
    add: 5000,
    label: 'High Complexity/Enterprise Scale',
    description: 'Advanced architecture and scalability'
  }
}

const timelineMultipliers = {
  rush: { multiplier: 1.5, label: 'Rush (2-4 weeks)', description: 'Priority development' },
  standard: { multiplier: 1.0, label: 'Standard (4-6 weeks)', description: 'Normal timeline' },
  flexible: { multiplier: 0.9, label: 'Flexible (6-10 weeks)', description: 'Extended timeline discount' }
}

const supportOptions = {
  basic: {
    price: 0,
    label: 'Basic Support',
    description: '30-day guarantee, 2 months updates, training included (additional charges after)'
  },
  premium: {
    price: 3000,
    label: 'Premium Support',
    description: '6 months support, priority updates, training'
  }
}

const availableFeatures = [
  { id: 'mobile-responsive', name: 'Mobile Responsive Design' },
  { id: 'user-authentication', name: 'User Authentication System' },
  { id: 'payment-processing', name: 'Payment Processing' },
  { id: 'api-integrations', name: 'Third-party API Integrations' },
  { id: 'advanced-analytics', name: 'Advanced Analytics' },
  { id: 'multi-tenant', name: 'Multi-tenant Architecture' },
  { id: 'mobile-app', name: 'Companion Mobile App' },
  { id: 'ai-features', name: 'AI-powered Features' }
]

export function InteractivePricingCalculator() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [calculatorState, setCalculatorState] = useState<PricingCalculatorState>({
    softwareType: 'ecommerce',
    complexity: 'standard',
    features: ['mobile-responsive'],
    timeline: 'standard',
    support: 'basic'
  })
  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null)

  const calculatePricing = useCallback(() => {
    try {
      setError(null)
      logger.info('PricingCalculator: Calculating pricing', { calculatorState })
      
      const selectedSoftware = softwareTypes.find(s => s.id === calculatorState.softwareType)
      if (!selectedSoftware) throw new Error('Invalid software type')

      const basePrice = selectedSoftware.minPrice
      const complexityAdd = complexityOptions[calculatorState.complexity].add
      const timelineMultiplier = timelineMultipliers[calculatorState.timeline].multiplier
      const supportPrice = supportOptions[calculatorState.support].price

      const subtotal = basePrice + complexityAdd
      const totalPrice = Math.round(subtotal * timelineMultiplier + supportPrice)
      
      // Calculate ROI estimates
      const roiMultipliers: Record<string, number> = {
        'ecommerce': 3.8,
        'agency-to-saas': 12,
        'workflow-automation': 6.0,
        'mobile-app': 2.2,
        'ai-integration': 8.0,
        'business-management': 4.5
      }
      
      const annualROI = Math.round(totalPrice * roiMultipliers[calculatorState.softwareType])
      const roiPercentage = Math.round((annualROI / totalPrice - 1) * 100)
      const paybackMonths = Math.round((totalPrice / (annualROI / 12)) * 10) / 10

      setPricingResult({
        basePrice: subtotal,
        totalPrice,
        timeline: timelineMultipliers[calculatorState.timeline].label,
        roi: `${roiPercentage}% ($${annualROI.toLocaleString()}/year)`,
        paybackPeriod: `${paybackMonths} months`
      })

      logger.info('PricingCalculator: Pricing calculated', { totalPrice, roi: roiPercentage })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to calculate pricing'
      logger.error('PricingCalculator: Calculation failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [calculatorState])

  useEffect(() => {
    calculatePricing()
  }, [calculatePricing])

  const updateCalculatorState = useCallback((updates: Partial<PricingCalculatorState>) => {
    try {
      setError(null)
      setCalculatorState(prev => ({ ...prev, ...updates }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update calculator'
      logger.error('PricingCalculator: Update failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  const toggleFeature = useCallback((featureId: string) => {
    updateCalculatorState({
      features: calculatorState.features.includes(featureId)
        ? calculatorState.features.filter(f => f !== featureId)
        : [...calculatorState.features, featureId]
    })
  }, [calculatorState.features, updateCalculatorState])

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-2 border-accent-600 border-t-transparent rounded-full mr-3"></div>
        <span>Loading pricing calculator...</span>
      </div>
    )
  }

  return (
    <section className="py-16 relative bg-neutral-900">
      { (
        <div className="absolute inset-0">
          <StarsBackground 
            starDensity={0.00010} 
            className="opacity-30" 
            allStarsTwinkle={true}
          />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-sans font-semibold tracking-tighter2 text-4xl text-white mb-4">
            Interactive Pricing Calculator
          </h2>
          <p className="font-sans text-sm text-neutral-300 max-w-3xl mx-auto mb-4">
            Prices are very project dependent; consider these rough estimates—final price can end up lower or higher than the ranges shown.
          </p>
          <p className="font-sans text-lg text-neutral-200 tracking-tightish max-w-3xl mx-auto">
            Get an instant estimate for your custom software project.
            Adjust the options below to see how pricing changes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Options */}
          <div className="space-y-8">
            {/* Software Type */}
            <div>
              <label className="block text-lg font-semibold mb-4 text-white">
                What type of software do you need?
              </label>
              <div className="grid gap-3">
                {softwareTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateCalculatorState({ softwareType: type.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.softwareType === type.id
                        ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                        : 'border-neutral-700 bg-neutral-800 hover:border-accent-400 text-white'
                    }`}
                  >
                    <div className={`font-medium ${
                      calculatorState.softwareType === type.id ? 'text-accent-300' : 'text-white'
                    }`}>{type.name}</div>
                    <div className="text-sm text-neutral-400">${type.minPrice.toLocaleString()} - ${type.maxPrice.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Complexity Level
              </label>
              <div className="grid gap-3">
                {Object.entries(complexityOptions).map(([key, complexity]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ complexity: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.complexity === key
                        ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                        : 'border-neutral-700 bg-neutral-800 hover:border-accent-400 text-white'
                    }`}
                  >
                    <div className="font-medium">{complexity.label}</div>
                    <div className="text-sm text-neutral-400">{complexity.description}</div>
                    {complexity.add > 0 && (
                      <div className="text-sm font-medium text-accent-600">+${complexity.add.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Timeline Preference
              </label>
              <div className="grid gap-3">
                {Object.entries(timelineMultipliers).map(([key, timeline]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ timeline: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.timeline === key
                        ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                        : 'border-neutral-700 bg-neutral-800 hover:border-accent-400 text-white'
                    }`}
                  >
                    <div className="font-medium">{timeline.label}</div>
                    <div className="text-sm text-neutral-400">{timeline.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Typical Features */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Typical Features
              </label>
              <div className="grid gap-2">
                {availableFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      calculatorState.features.includes(feature.id)
                        ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                        : 'border-neutral-700 bg-neutral-800 hover:border-accent-400 text-white'
                    }`}
                  >
                    <span className="font-medium">{feature.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <label className="block text-lg font-semibold text-white mb-4">
                Support Package
              </label>
              <div className="grid gap-3">
                {Object.entries(supportOptions).map(([key, support]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ support: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.support === key
                        ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                        : 'border-neutral-700 bg-neutral-800 hover:border-accent-400 text-white'
                    }`}
                  >
                    <div className="font-medium">{support.label}</div>
                    <div className="text-sm text-neutral-400">{support.description}</div>
                    {support.price > 0 && (
                      <div className="text-sm font-medium text-accent-600">+${support.price.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Result */}
          <div className="lg:sticky lg:top-8">
            {pricingResult && (
              <div className="rounded-2xl shadow-xl p-8 bg-neutral-800 border border-neutral-600">
                <h3 className="text-2xl font-bold mb-6 text-white">Your Project Estimate</h3>
                
                <div className="space-y-6">
                  {/* Total Price */}
                <div className="text-center bg-neutral-800 rounded-lg p-6">
                    <div className="text-sm text-neutral-300 mb-2">Total Investment</div>
                    <div className="text-4xl font-bold text-accent-600 mb-2">
                      ${pricingResult.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-neutral-400">{pricingResult.timeline}</div>
                  </div>

                  {/* ROI Information */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="font-medium">Expected ROI</span>
                      <span className="text-accent-600 font-bold">{pricingResult.roi}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="font-medium">Payback Period</span>
                      <span className="font-bold">{pricingResult.paybackPeriod}</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      Get Your Free 15-Minute Consultation
                    </button>
                    <button className="w-full px-6 py-3 border-2 border-accent-600 text-accent-600 font-medium rounded-lg hover:bg-accent-500/10 transition-all">
                      Download Detailed Quote (PDF)
                    </button>
                  </div>

                  {/* Guarantee */}
                  <div className="text-center text-sm text-neutral-300 bg-neutral-800 rounded-lg p-4">
                    <div className="font-medium text-accent-400 mb-1">30-Day Success Guarantee</div>
                    <div>Your satisfaction is guaranteed or your money back</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractivePricingCalculator