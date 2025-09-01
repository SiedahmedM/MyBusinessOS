'use client'
import { useState, useCallback } from 'react'
import { softwareTypes } from '@/types/tabs'
import type { SoftwareType } from '@/types/tabs'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { logger } from '@/lib/logger'
import { StarsBackground } from '@/components/ui/stars-background'
import { scrollToSection } from '@/lib/utils'

interface SoftwareTypeGridProps {
  onTypeSelected?: (type: SoftwareType) => void
  className?: string
}

export function SoftwareTypeGrid({ onTypeSelected, className = '' }: SoftwareTypeGridProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleTypeClick = useCallback((type: SoftwareType) => {
    logger.info('SoftwareTypeGrid: Type selected', { typeId: type.id })
    setSelectedType(type.id)
    if (onTypeSelected) {
      onTypeSelected(type)
    }
    // Navigate to AI playground to build this type
    scrollToSection('ai-playground')
  }, [onTypeSelected])

  const handleCTAClick = (e: React.MouseEvent, action: 'quote' | 'ai-builder') => {
    e.stopPropagation()
    if (action === 'quote') {
      scrollToSection('contact')
    } else {
      scrollToSection('ai-playground')
    }
  }

  // Helper function to get grid column span classes for the 6-column grid
  const getGridColSpan = (type: SoftwareType) => {
    if (type.size === 'large') {
      // Large tiles span 3 columns on desktop 6-column grid (1/2 width), full width on mobile
      return 'col-span-1 md:col-span-3'
    }
    // Standard tiles span 2 columns on desktop 6-column grid (1/3 width), full width on mobile
    return 'col-span-1 md:col-span-2'
  }

  return (
    <section className={`relative software-grid-mobile section-overlap section-fade-bottom section-fade-bottom--black ${className}`}>
      <StarsBackground starDensity={0.00003} className="opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header-mobile text-center mb-12">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white mb-4">
            What Can We Build For You?
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-200 tracking-tightish max-w-2xl mx-auto">
            Choose your software type below to explore solutions and get instant ROI estimates
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="mb-12">
          {softwareTypes.map((type) => (
              <BentoGridItem
                key={type.id}
                title={type.title}
                description={type.description}
                onClick={() => handleTypeClick(type)}
                className={`cursor-pointer hover:scale-[1.02] transition-all ${getGridColSpan(type)} ${
                  selectedType === type.id ? 'ring-2 ring-accent-500' : ''
                }`}
                icon={<span className="text-2xl text-accent-400">{type.icon}</span>}
                header={
                  <div className="space-y-4">
                    {/* Features/Examples */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider">
                        What You Get
                      </h4>
                      <ul className="space-y-2">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* ROI Badge */}
                    <div className="bg-gradient-to-r from-accent-500/20 to-accent-400/20 border border-accent-500/30 rounded-lg p-4">
                      <div className="text-xs font-bold text-accent-300 mb-1 uppercase tracking-wider">ROI ESTIMATE</div>
                      <div className="text-sm font-semibold text-accent-100">{type.roiExample}</div>
                    </div>
                    
                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={(e) => handleCTAClick(e, 'quote')}
                        className="flex-1 min-h-[44px] px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        Get a Quote
                      </button>
                      <button
                        onClick={(e) => handleCTAClick(e, 'ai-builder')}
                        className="flex-1 min-h-[44px] px-4 py-2 bg-accent-500 text-white rounded-lg text-sm font-medium hover:hover:bg-accent-600 active:bg-accent-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/50"
                      >
                        Build With AI
                      </button>
                    </div>
                  </div>
                }
              />
          ))}
        </BentoGrid>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <h3 className="text-xl font-bold text-accent-400 mb-4">
            Don't See Your Exact Needs?
          </h3>
          <p className="text-neutral-200 mb-6 text-sm leading-relaxed max-w-2xl mx-auto">
            We build custom solutions for unique requirements. If you can describe it, we can build it.
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary min-h-[44px] px-8 py-3 hover:scale-105 active:scale-95 transition-transform"
          >
            Discuss Your Custom Project
          </button>
        </div>
      </div>
    </section>
  )
}

export default SoftwareTypeGrid