'use client'
import { TechGrid } from './TechGrid'
import { CodeDisplay } from './CodeDisplay'

export function TechShowcase() {
  console.log('TechShowcase: Rendering component');

  return (
    <>
      {/* Tech Stack Section */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-6">
              Cutting-Edge Technology Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The same technologies used by Netflix, Uber, and Tesla
            </p>
          </div>
          
          <TechGrid />
        </div>
      </section>

      {/* Live Code Section */}
      <section className="section-padding bg-code-gradient">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <h2 className="section-title text-gray-900 mb-6">
                Watch Me Code Your Solution
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                This is actual code from Adam's muffler shop CRM system. 
                See how I build real-time features that keep customers 
                informed and businesses running smoothly.
              </p>
              
              <div className="space-y-4">
                {[
                  'Real-time database subscriptions',
                  'Automatic SMS notifications', 
                  'Live dashboard updates',
                  'Customer progress tracking'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Code */}
            <div>
              <CodeDisplay />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}