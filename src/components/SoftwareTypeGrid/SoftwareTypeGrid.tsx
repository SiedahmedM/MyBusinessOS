'use client'
import { useState, useCallback } from 'react'
import { softwareTypes } from '@/types/tabs'
import type { SoftwareType } from '@/types/tabs'
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
        <div className="animate-spin h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full mr-3"></div>
        <span>Loading software types...</span>
      </div>
    )
  }

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Can I Build For You?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your software type below to see examples, ROI estimates, and real case studies
          </p>
        </div>

        {/* Software Type Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {softwareTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleTypeClick(type)}
              className={`group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                selectedType === type.id 
                  ? 'border-purple-500 ring-4 ring-purple-200' 
                  : 'border-transparent hover:border-purple-200'
              }`}
            >
              {/* Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {type.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {type.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {type.description}
              </p>

              {/* Examples */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-500 mb-3">INCLUDES:</div>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full font-medium"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* ROI Example */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-1">
                      TYPICAL ROI
                    </div>
                    <div className="text-sm text-gray-600">
                      {type.roiExample}
                    </div>
                  </div>
                  
                  {/* Case Study Badge */}
                  {type.caseStudy && (
                    <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                      Case Study →
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Exact Needs?
            </h3>
            <p className="text-gray-600 mb-6">
              I build custom solutions for unique requirements. From enterprise systems to innovative startups - if you can describe it, I can build it.
            </p>
            <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
              Discuss Your Custom Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoftwareTypeGrid