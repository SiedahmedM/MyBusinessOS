'use client'
import { useState, useCallback, useEffect } from 'react'
import { logger } from '@/lib/logger'
import { StarsBackground } from '@/components/ui/stars-background'


interface PricingCalculatorState {
  softwareType: string
  complexity: 'simple' | 'standard' | 'complex'
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
  { id: 'business-management', name: 'Business Management System', basePrice: 25000 },
  { id: 'agency-to-saas', name: 'Agency to SaaS Platform', basePrice: 45000 },
  { id: 'ecommerce', name: 'E-commerce Platform', basePrice: 30000 },
  { id: 'mobile-app', name: 'Mobile Application', basePrice: 35000 },
  { id: 'analytics-dashboard', name: 'Analytics Dashboard', basePrice: 20000 },
  { id: 'ai-automation', name: 'AI/Automation Tool', basePrice: 40000 }
]

const complexityMultipliers = {
  simple: { multiplier: 0.6, label: 'Simple', description: 'Basic functionality, standard features' },
  standard: { multiplier: 1.0, label: 'Standard', description: 'Full features, custom UI, integrations' },
  complex: { multiplier: 1.8, label: 'Complex', description: 'Enterprise features, advanced architecture' }
}

const timelineMultipliers = {
  rush: { multiplier: 1.5, label: 'Rush (2-4 weeks)', description: 'Priority development' },
  standard: { multiplier: 1.0, label: 'Standard (4-8 weeks)', description: 'Normal timeline' },
  flexible: { multiplier: 0.9, label: 'Flexible (8-12 weeks)', description: 'Extended timeline discount' }
}

const supportOptions = {
  basic: { price: 0, label: 'Basic Support', description: '30-day guarantee, 6 months updates' },
  premium: { price: 5000, label: 'Premium Support', description: '1-year support, priority updates, training' }
}

const availableFeatures = [
  { id: 'mobile-responsive', name: 'Mobile Responsive Design', price: 0 },
  { id: 'user-authentication', name: 'User Authentication System', price: 2000 },
  { id: 'payment-processing', name: 'Payment Processing', price: 3000 },
  { id: 'api-integrations', name: 'Third-party API Integrations', price: 2500 },
  { id: 'advanced-analytics', name: 'Advanced Analytics', price: 4000 },
  { id: 'multi-tenant', name: 'Multi-tenant Architecture', price: 8000 },
  { id: 'mobile-app', name: 'Companion Mobile App', price: 15000 },
  { id: 'ai-features', name: 'AI-powered Features', price: 10000 }
]

export function InteractivePricingCalculator() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [calculatorState, setCalculatorState] = useState<PricingCalculatorState>({
    softwareType: 'business-management',
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

      const basePrice = selectedSoftware.basePrice
      const complexityMultiplier = complexityMultipliers[calculatorState.complexity].multiplier
      const timelineMultiplier = timelineMultipliers[calculatorState.timeline].multiplier
      const supportPrice = supportOptions[calculatorState.support].price
      
      const featuresPrice = calculatorState.features.reduce((total, featureId) => {
        const feature = availableFeatures.find(f => f.id === featureId)
        return total + (feature?.price || 0)
      }, 0)

      const subtotal = (basePrice * complexityMultiplier) + featuresPrice
      const totalPrice = Math.round((subtotal * timelineMultiplier) + supportPrice)
      
      // Calculate ROI estimates
      const roiMultipliers: Record<string, number> = {
        'business-management': 4.5,
        'agency-to-saas': 12,
        'ecommerce': 3.8,
        'mobile-app': 2.2,
        'analytics-dashboard': 5.5,
        'ai-automation': 8.0
      }
      
      const annualROI = Math.round(totalPrice * roiMultipliers[calculatorState.softwareType])
      const roiPercentage = Math.round((annualROI / totalPrice - 1) * 100)
      const paybackMonths = Math.round((totalPrice / (annualROI / 12)) * 10) / 10

      setPricingResult({
        basePrice: Math.round(basePrice * complexityMultiplier),
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
          <h2 className="text-4xl font-bold mb-6 text-white">
            Interactive Pricing Calculator
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-neutral-200">
            Get an instant estimate for your custom software project. 
            Adjust the options below to see how pricing changes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Options */}
          <div className="space-y-8">
            {/* Software Type */}
            <div>
              <label className={`block text-lg font-semibold mb-4 ${
                true ? 'text-white' : 'text-neutral-900'
              }`}>
                What type of software do you need?
              </label>
              <div className="grid gap-3">
                {softwareTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateCalculatorState({ softwareType: type.id })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.softwareType === type.id
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-neutral-600 bg-neutral-800 hover:border-accent-300 text-white'
                    }`}
                  >
                    <div className={`font-medium ${
                       calculatorState.softwareType !== type.id ? 'text-white' : ''
                    }`}>{type.name}</div>
                    <div className={`text-sm ${
                      true ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>Starting at ${type.basePrice.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-lg font-semibold text-neutral-900 mb-4">
                Complexity Level
              </label>
              <div className="grid gap-3">
                {Object.entries(complexityMultipliers).map(([key, complexity]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ complexity: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.complexity === key
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <div className="font-medium">{complexity.label}</div>
                    <div className="text-sm text-neutral-500">{complexity.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-lg font-semibold text-neutral-900 mb-4">
                Timeline Preference
              </label>
              <div className="grid gap-3">
                {Object.entries(timelineMultipliers).map(([key, timeline]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ timeline: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.timeline === key
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <div className="font-medium">{timeline.label}</div>
                    <div className="text-sm text-neutral-500">{timeline.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            <div>
              <label className="block text-lg font-semibold text-neutral-900 mb-4">
                Additional Features
              </label>
              <div className="grid gap-2">
                {availableFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      calculatorState.features.includes(feature.id)
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{feature.name}</span>
                      <span className="text-sm text-neutral-500">
                        {feature.price === 0 ? 'Included' : `+$${feature.price.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <label className="block text-lg font-semibold text-neutral-900 mb-4">
                Support Package
              </label>
              <div className="grid gap-3">
                {Object.entries(supportOptions).map(([key, support]) => (
                  <button
                    key={key}
                    onClick={() => updateCalculatorState({ support: key as any })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      calculatorState.support === key
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-accent-300'
                    }`}
                  >
                    <div className="font-medium">{support.label}</div>
                    <div className="text-sm text-neutral-500">{support.description}</div>
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
              <div className={`rounded-2xl shadow-xl p-8 ${
                true ? 'bg-neutral-800 border border-neutral-600' : 'bg-white'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  true ? 'text-white' : 'text-neutral-900'
                }`}>Your Project Estimate</h3>
                
                <div className="space-y-6">
                  {/* Total Price */}
                <div className="text-center bg-neutral-50 rounded-lg p-6">
                    <div className="text-sm text-gray-600 mb-2">Total Investment</div>
                    <div className="text-4xl font-bold text-accent-600 mb-2">
                      ${pricingResult.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-neutral-500">{pricingResult.timeline}</div>
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
                      Get Your Free Consultation
                    </button>
                    <button className="w-full px-6 py-3 border-2 border-accent-600 text-accent-600 font-medium rounded-lg hover:bg-accent-50 transition-all">
                      Download Detailed Quote (PDF)
                    </button>
                  </div>

                  {/* Guarantee */}
                  <div className="text-center text-sm text-gray-600 bg-neutral-100 rounded-lg p-4">
                    <div className="font-medium text-accent-700 mb-1">30-Day Success Guarantee</div>
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