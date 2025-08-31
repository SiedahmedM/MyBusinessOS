'use client'
import { useState } from 'react'
import { TabSystem } from './TabSystem'
import { CalculatorForms } from './CalculatorForms'
import { Button } from '@/components/ui/button'

export function ROICalculator() {
  const [activeTab, setActiveTab] = useState('time')

  console.log('ROICalculator: Rendering with activeTab:', activeTab);

  return (
    <section id="roi-calculator" className="section-padding bg-roi-gradient section-fade-top section-fade-top--black section-fade-bottom section-fade-bottom--black branded-section">
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect rounded-2xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                <span className="text-2xl text-accent-400">◆</span>
              </div>
            </div>
            <h2 className="font-sans font-semibold tracking-tighter2 text-3xl lg:text-4xl text-white mb-4">
              Calculate Your ROI
            </h2>
            <p className="font-sans text-base md:text-lg text-neutral-300 tracking-tightish max-w-2xl mx-auto">
              See exactly how much CustomSoftwarePro solutions will save your business.
              These calculations are based on real results from my clients.
            </p>
          </div>

          {/* Tab System */}
          <TabSystem 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* Calculator Forms */}
          <CalculatorForms activeTab={activeTab} />

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-neutral-300 mb-6">
              Ready to see these results in your business?
            </p>
            <Button
              onClick={() => document.getElementById('ai-playground')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}