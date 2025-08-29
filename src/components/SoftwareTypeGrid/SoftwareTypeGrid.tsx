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
    <section className={`software-grid-mobile section-overlap section-fade-bottom section-fade-bottom--black branded-section ${className}`}>
      {/* Header */}
      <div className="section-header-mobile">
        <h2 className="text-neutral-900">
          What Can I Build For You?
        </h2>
        <p className="text-neutral-600">
          Choose your software type below to see examples and ROI estimates
        </p>
      </div>

      {/* Software Type Grid - Mobile Full Width */}
      <div className="mobile-native-grid">
        {softwareTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleTypeClick(type)}
            className={`card-full-mobile group cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedType === type.id
                ? 'border-accent-500 bg-accent-50/50 shadow-lg'
                : 'hover:border-accent-200 hover:bg-accent-50/20'
            }`}
            role="button"
            tabIndex={0}
            aria-label={`Select ${type.title} software type`}
          >
            {/* Mobile-optimized card content */}
            <div className="space-y-4">
              {/* Icon and Title */}
              <div className="flex items-start space-x-3">
                <div className="text-3xl flex-shrink-0 mt-1">
                  {type.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                    selectedType === type.id ? 'text-accent-700' : 'text-gray-900 group-hover:text-accent-600'
                  }`}>
                    {type.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>

              {/* Key Features - Mobile optimized list */}
              <div className="space-y-2">
                {type.examples.slice(0, 3).map((example, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span>{example}</span>
                  </div>
                ))}
              </div>

              {/* ROI Summary */}
              <div className="pt-3 border-t border-gray-100">
                <div className="text-xs font-semibold text-accent-600 mb-1">
                  ROI ESTIMATE
                </div>
                <div className="text-sm font-medium text-neutral-700">
                  {type.roiExample}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action - Full width on mobile */}
      <div className="mobile-cta-section mt-4">
        <div className="mobile-content-padding">
          <h3 className="text-xl font-bold text-accent-400 mb-3">
            Don't See Your Exact Needs?
          </h3>
          <p className="text-neutral-100 mb-4 text-sm leading-relaxed">
            I build custom solutions for unique requirements. If you can describe it, I can build it.
          </p>
          <div className="mobile-cta-buttons">
            <button
              className="w-full btn-primary"
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