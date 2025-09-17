'use client'
import { TechGrid } from './TechGrid'
import { CodeDisplay } from './CodeDisplay'
import { StarsBackground } from '@/components/ui/stars-background'


export function TechShowcase({ embedded = false }: { embedded?: boolean }) {
  console.log('TechShowcase: Rendering component');

  return (
    <section className={`tech-showcase-mobile relative ${embedded ? 'tech-embedded' : ''}`}>
      { (!embedded && (
        <StarsBackground 
          starDensity={0.00008} 
          className="opacity-20" 
          allStarsTwinkle={true}
        />
      ))}
      <div className="section-header-mobile relative z-10">
        <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white">
          Cutting-Edge Technology Stack
        </h2>
        <p className="font-sans text-base md:text-lg text-neutral-300 tracking-tightish">
          The same technologies used by Netflix, Uber, and Tesla
        </p>
      </div>
      
      {/* Simple credibility section */}
      <div className={`mobile-content-padding relative z-10 ${embedded ? 'pt-4 pb-0' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-lg text-neutral-300 tracking-tightish leading-relaxed">
            We build with enterprise-grade technologies that power the world's most successful companies.
            Your solution gets the same reliability, performance, and scalability.
          </p>

          {/* Feature badges when embedded */}
          {embedded ? (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6">
              {['Enterprise Security','Real-time Features','Mobile Optimization','Scalable Architecture'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/15 text-accent-200 text-sm font-medium"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {['Enterprise Security','Real-time Features','Mobile Optimization','Scalable Architecture'].map((feature, index) => (
                <div key={index} className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4`}>
                  <div className="text-white font-medium text-sm">{feature}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
