'use client'
import { useState, useCallback, useEffect } from 'react'
import { logger } from '@/lib/logger'

import { StarsBackground } from '@/components/ui/stars-background'

interface QuickROIInputs {
  softwareType: string
  monthlyRevenue: number
  hoursSpentManually: number
  teamSize: number
}

interface ROIResult {
  investment: string
  yearlySavings: string
  roi: string
  breakdown: string
  paybackPeriod: string
}

const softwareTypeROI = {
  'business-management': {
    name: 'Business Management System',
    baseCost: 25000,
    timeSavingsMultiplier: 0.4,
    revenueMultiplier: 0.25,
    description: 'Automate operations, improve customer experience'
  },
  'agency-to-saas': {
    name: 'Agency to SaaS Platform',
    baseCost: 45000,
    timeSavingsMultiplier: 0.8,
    revenueMultiplier: 2.0,
    description: 'Transform to recurring revenue model'
  },
  'ecommerce': {
    name: 'E-commerce Platform',
    baseCost: 30000,
    timeSavingsMultiplier: 0.3,
    revenueMultiplier: 0.6,
    description: 'Increase conversions, automate fulfillment'
  },
  'mobile-app': {
    name: 'Mobile Application',
    baseCost: 35000,
    timeSavingsMultiplier: 0.2,
    revenueMultiplier: 0.8,
    description: 'Reach mobile customers, boost engagement'
  },
  'analytics-dashboard': {
    name: 'Analytics Dashboard',
    baseCost: 20000,
    timeSavingsMultiplier: 0.5,
    revenueMultiplier: 0.3,
    description: 'Data-driven decisions, performance insights'
  },
  'ai-automation': {
    name: 'AI/Automation Tool',
    baseCost: 40000,
    timeSavingsMultiplier: 0.8,
    revenueMultiplier: 0.2,
    description: 'Eliminate manual work, scale operations'
  }
}

export function QuickROICalculator() {
  const [error, setError] = useState<string | null>(null)
  const [inputs, setInputs] = useState<QuickROIInputs>({
    softwareType: 'business-management',
    monthlyRevenue: 50000,
    hoursSpentManually: 20,
    teamSize: 5
  })
  const [result, setResult] = useState<ROIResult | null>(null)

  

  const calculateROI = useCallback(() => {
    try {
      setError(null)
      logger.info('QuickROICalculator: Calculating ROI', { inputs })

      const softwareData = softwareTypeROI[inputs.softwareType as keyof typeof softwareTypeROI]
      if (!softwareData) {
        throw new Error('Invalid software type')
      }

      // Calculate investment
      const baseInvestment = softwareData.baseCost
      const teamSizeMultiplier = Math.max(0.8, Math.min(1.5, 1 + (inputs.teamSize - 5) * 0.05))
      const investment = Math.round(baseInvestment * teamSizeMultiplier)

      // Calculate time savings
      const hourlyRate = 50 // Average hourly cost per employee
      const weeksPerYear = 50 // Working weeks
      const timeSavingsHours = inputs.hoursSpentManually * softwareData.timeSavingsMultiplier
      const yearlySavingsFromTime = timeSavingsHours * weeksPerYear * hourlyRate * inputs.teamSize

      // Calculate revenue impact
      const annualRevenue = inputs.monthlyRevenue * 12
      const revenueIncrease = annualRevenue * softwareData.revenueMultiplier

      // Total yearly savings
      const totalYearlySavings = yearlySavingsFromTime + revenueIncrease

      // Calculate ROI
      const roiPercentage = Math.round(((totalYearlySavings - investment) / investment) * 100)
      const paybackMonths = Math.round((investment / (totalYearlySavings / 12)) * 10) / 10

      setResult({
        investment: `$${investment.toLocaleString()}`,
        yearlySavings: `$${Math.round(totalYearlySavings).toLocaleString()}`,
        roi: `${roiPercentage}%`,
        breakdown: `Time savings: $${Math.round(yearlySavingsFromTime).toLocaleString()}/year + Revenue increase: $${Math.round(revenueIncrease).toLocaleString()}/year`,
        paybackPeriod: `${paybackMonths} months`
      })

      logger.info('QuickROICalculator: ROI calculated', { roi: roiPercentage, paybackMonths })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to calculate ROI'
      logger.error('QuickROICalculator: Calculation failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [inputs])

  useEffect(() => {
    calculateROI()
  }, [calculateROI])

  const updateInput = useCallback((field: keyof QuickROIInputs, value: string | number) => {
    try {
      setError(null)
      setInputs(prev => ({ ...prev, [field]: value }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update input'
      logger.error('QuickROICalculator: Input update failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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

  const selectedSoftware = softwareTypeROI[inputs.softwareType as keyof typeof softwareTypeROI]

  return (
    <section className="relative bg-neutral-50 py-16">
      {/* Stars for full-dark theme */}
      { (
        <StarsBackground starDensity={0.00005} className="opacity-30" />
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Quick ROI Calculator
          </h2>
          <p className="text-lg text-neutral-600">
            See your potential return on investment in 30 seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Tell us about your business</h3>
              
              {/* Software Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Software Type
                </label>
                <select
                  value={inputs.softwareType}
                  onChange={(e) => updateInput('softwareType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  {Object.entries(softwareTypeROI).map(([key, software]) => (
                    <option key={key} value={key}>{software.name}</option>
                  ))}
                </select>
                <p className="text-sm text-neutral-500 mt-1">{selectedSoftware.description}</p>
              </div>

              {/* Monthly Revenue */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Monthly Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                  <input
                    type="number"
                    value={inputs.monthlyRevenue}
                    onChange={(e) => updateInput('monthlyRevenue', parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="50000"
                    min="1000"
                    max="10000000"
                    step="1000"
                  />
                </div>
              </div>

              {/* Hours Spent Manually */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Hours per week on manual tasks
                </label>
                <input
                  type="number"
                  value={inputs.hoursSpentManually}
                  onChange={(e) => updateInput('hoursSpentManually', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="20"
                  min="1"
                  max="80"
                />
                <p className="text-sm text-neutral-500 mt-1">Time spent on tasks that could be automated</p>
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Team Size
                </label>
                <input
                  type="number"
                  value={inputs.teamSize}
                  onChange={(e) => updateInput('teamSize', parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="5"
                  min="1"
                  max="100"
                />
                <p className="text-sm text-neutral-500 mt-1">Number of employees who would use the software</p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Your ROI Projection</h3>
              
              {result && (
                <div className="space-y-6">
                  {/* Investment */}
                  <div>
                    <div className="text-sm opacity-80">Total Investment</div>
                    <div className="text-3xl font-bold">{result.investment}</div>
                  </div>

                  {/* Annual Savings */}
                  <div>
                    <div className="text-sm opacity-80">Annual Benefits</div>
                    <div className="text-3xl font-bold text-accent-300">{result.yearlySavings}</div>
                  </div>

                  {/* ROI */}
                  <div>
                    <div className="text-sm opacity-80">Return on Investment</div>
                    <div className="text-4xl font-bold text-accent-300">{result.roi}</div>
                  </div>

                  {/* Payback Period */}
                  <div>
                    <div className="text-sm opacity-80">Payback Period</div>
                    <div className="text-2xl font-bold">{result.paybackPeriod}</div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm opacity-80 mb-2">How we calculated this:</div>
                    <div className="text-sm">{result.breakdown}</div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/20">
                    <button className="w-full btn-primary">
                      Get Your Custom Quote
                    </button>
                    <p className="text-xs text-center mt-2 opacity-80">
                      Free consultation • No obligation • 24-hour response
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-8 text-center bg-neutral-100 rounded-lg p-6">
            <div className="text-accent-700 font-semibold mb-2">◆ 30-Day Success Guarantee</div>
            <p className="text-accent-600 text-sm">
              If you don't see measurable results within 30 days, we'll refund your investment completely.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickROICalculator