'use client'
import { useState } from 'react'
import { iPhoneSimulator } from './iPhoneSimulator'
import { AIChat } from './AIChat'

export function AIPlayground() {
  const [currentBusinessType, setCurrentBusinessType] = useState('dental')

  console.log('AIPlayground: Rendering with business type:', currentBusinessType);

  const handleBusinessTypeDetected = (businessType: string) => {
    console.log('AIPlayground: Business type detected:', businessType);
    setCurrentBusinessType(businessType)
  }

  return (
    <section id="ai-playground" className="section-padding bg-purple-gradient">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-white mb-6">
            Watch Your Custom App Build In Real-Time
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Tell our AI about your business and watch as it creates a custom mobile app 
            just for you. This is the same process I use for all my clients.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: iPhone Simulator */}
          <div className="flex justify-center">
            <iPhoneSimulator businessType={currentBusinessType} />
          </div>

          {/* Right: AI Chat Interface */}
          <div className="glass-dark rounded-2xl p-6 lg:p-8">
            <AIChat onBusinessTypeDetected={handleBusinessTypeDetected} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-purple-200 mb-6">
            Ready to get your custom software built?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg btn-hover focus-outline"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}