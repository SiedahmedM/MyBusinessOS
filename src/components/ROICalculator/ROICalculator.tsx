'use client'
import { useState } from 'react'
import { TabSystem } from './TabSystem'
import { CalculatorForms } from './CalculatorForms'

export function ROICalculator() {
  const [activeTab, setActiveTab] = useState('time')

  console.log('ROICalculator: Rendering with activeTab:', activeTab);

  return (
    <section id="roi-calculator" className="section-padding bg-roi-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect rounded-2xl p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">◆</span>
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See exactly how much MyBusinessOS solutions will save your business. 
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
            <p className="text-gray-600 mb-6">
              Ready to see these results in your business?
            </p>
            <button
              onClick={() => document.getElementById('ai-playground')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Get Your Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}