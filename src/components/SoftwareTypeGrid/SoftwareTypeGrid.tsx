'use client'
import { useState, useCallback } from 'react'
import { softwareTypes } from '@/types/tabs'
import type { SoftwareType } from '@/types/tabs'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { logger } from '@/lib/logger'

interface SoftwareTypeGridProps {
  onTypeSelected?: (type: SoftwareType) => void
  className?: string
}

export function SoftwareTypeGrid({ onTypeSelected, className = '' }: SoftwareTypeGridProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeClick = useCallback((type: SoftwareType) => {
    try {
      setError(null)
      logger.info('SoftwareTypeGrid: Type selected', { typeId: type.id })
      setSelectedType(type.id)
      if (onTypeSelected) {
        onTypeSelected(type)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to select software type'
      logger.error('SoftwareTypeGrid: Type selection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [onTypeSelected])

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
        <LoadingSpinner message="Loading software types..." size="lg" />
      </div>
    )
  }

  return (
    <section className={`py-20 bg-neutral-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-neutral-900 mb-6">
            What Can I Build For You?
          </h2>
          <p className="body-lg text-neutral-600 max-w-3xl mx-auto">
            Choose your software type below to see examples and ROI estimates
          </p>
        </div>

        {/* Software Type Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 card-grid">
          {softwareTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleTypeClick(type)}
              className={`card-hover group cursor-pointer bg-white rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                selectedType === type.id 
                  ? 'border-accent-500 bg-accent-50/50' 
                  : 'border-neutral-200 hover:border-accent-200'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Select ${type.title} software type`}
            >
              {/* Icon and Title */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl flex-shrink-0">
                  {type.icon}
                </div>
                <div>
                  <h3 className={`heading-md mb-2 transition-colors ${
                    selectedType === type.id ? 'text-accent-700' : 'text-neutral-900 group-hover:text-accent-600'
                  }`}>
                    {type.title}
                  </h3>
                  <p className="body-md text-neutral-600 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-4">
                <ul className="space-y-1">
                  {type.examples.slice(0, 3).map((example, index) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-2 flex-shrink-0"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ROI Summary */}
              <div className="pt-4 border-t border-neutral-100">
                <div className="text-xs font-semibold text-accent-600 mb-1">
                  ROI ESTIMATE
                </div>
                <div className="text-sm text-neutral-700">
                  {type.roiExample}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 border border-neutral-200 max-w-2xl mx-auto">
            <h3 className="heading-lg text-neutral-900 mb-4">
              Don't See Your Exact Needs?
            </h3>
            <p className="body-md text-neutral-600 mb-6">
              I build custom solutions for unique requirements. If you can describe it, I can build it.
            </p>
            <button 
              className="btn-primary"
              aria-label="Schedule a consultation to discuss your custom project"
            >
              Discuss Your Custom Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoftwareTypeGrid