'use client'
import { TechGrid } from './TechGrid'
import { CodeDisplay } from './CodeDisplay'

export function TechShowcase() {
  console.log('TechShowcase: Rendering component');

  return (
    <section className="tech-showcase-mobile">
      <div className="section-header-mobile">
        <h2 className="text-white">
          Cutting-Edge Technology Stack
        </h2>
        <p className="text-neutral-300">
          The same technologies used by Netflix, Uber, and Tesla
        </p>
      </div>
      
      {/* Simple credibility section - no code display */}
      <div className="mobile-content-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <p className="text-lg text-neutral-300 leading-relaxed">
              I build with enterprise-grade technologies that power the world's most successful companies. 
              Your solution gets the same reliability, performance, and scalability.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                'Enterprise Security',
                'Real-time Features', 
                'Mobile Optimization',
                'Scalable Architecture'
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-white font-medium text-sm">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}