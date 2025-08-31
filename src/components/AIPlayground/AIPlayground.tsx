'use client'
import { useState, useCallback } from 'react'
import { IPhoneSimulator } from './IPhoneSimulator'
import { AIChat } from './AIChat'
import { logger } from '@/lib/logger'

import { StarsBackground } from '@/components/ui/stars-background'

type ViewState = 'chat' | 'building' | 'complete'

export function AIPlayground() {
  const [currentSoftwareType, setCurrentSoftwareType] = useState('business-management')
  const [viewState, setViewState] = useState<ViewState>('chat')
  const [isBuilding, setIsBuilding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  

  console.log('AIPlayground: Rendering', { 
    currentSoftwareType, 
    viewState 
  });

  const handleSoftwareTypeDetected = useCallback((businessType: string) => {
    try {
      console.log('AIPlayground: Business type detected:', businessType);
      
      // Map business types to software types
      const businessToSoftwareMap: Record<string, string> = {
        'dental': 'business-management',
        'auto': 'business-management',
        'restaurant': 'business-management', // Could also be 'ecommerce' if they want online ordering
        'medical': 'business-management',
        'ecommerce': 'ecommerce',
        'rental': 'business-management',
        'realestate': 'business-management',
        'fitness': 'mobile-app', // Fitness apps are often mobile-first
        'legal': 'business-management',
        'accounting': 'business-management',
        'consulting': 'business-management',
        'retail': 'ecommerce',
        'agency': 'agency-to-saas',
        'marketing': 'agency-to-saas',
        'other': 'business-management'
      };
      
      const softwareType = businessToSoftwareMap[businessType] || 'business-management';
      
      console.log('AIPlayground: Mapped to software type:', softwareType);
      logger.info('AIPlayground: Mapped to software type', { businessType, softwareType })
      setCurrentSoftwareType(softwareType)
      setViewState('building') // Go straight to building mobile app
      setIsBuilding(true)
      setError(null)
      
      // Auto transition to complete after build simulation
      setTimeout(() => {
        setIsBuilding(false)
        setViewState('complete')
      }, 6000)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to set software type'
      logger.error('AIPlayground: Software type detection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])


  const handleBackToChat = useCallback(() => {
    try {
      logger.info('AIPlayground: Returning to chat')
      setViewState('chat')
      setIsBuilding(false)
      setError(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to return to chat'
      logger.error('AIPlayground: Back to chat failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  if (error) {
    return (
      <section id="ai-playground" className="ai-playground-mobile section-fade-top section-fade-top--black">
        <div className="content-wrapper">
          <div className="mobile-content-padding">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">◆</div>
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button 
                onClick={() => {
                  setError(null)
                  setViewState('chat')
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="ai-playground" className="relative ai-playground-mobile section-fade-top section-fade-top--black">
      {/* Stars for full-dark theme */}
      { (
        <StarsBackground starDensity={0.00005} className="opacity-30" />
      )}
      
      <div className="relative z-10 content-wrapper">
        {/* Header */}
        <div className="section-header-mobile">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white">
            {viewState === 'chat'
              ? 'Tell Our AI About Your Business'
              : isBuilding
              ? 'Building Your Mobile App'
              : 'Your Mobile App is Ready!'
            }
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-200 tracking-tightish">
            {viewState === 'chat'
              ? 'Chat with our AI to describe your business. It will understand your needs and build you a mobile app demo in real-time.'
              : isBuilding
              ? 'Your custom mobile app is being built with enterprise-grade features tailored to your business needs.'
              : 'Your mobile app is ready! This demonstrates the quality and speed of our development process.'
            }
          </p>
        </div>

        {/* AI Chat Interface - Initial State */}
        {viewState === 'chat' && (
          <div className="mobile-content-padding">
            <div className="max-w-2xl mx-auto">
              <div className="glass-dark rounded-2xl p-6 lg:p-8">
                <AIChat 
                  onBusinessTypeDetected={handleSoftwareTypeDetected}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile App Demo - Mobile-first layout */}
        {(viewState === 'building' || viewState === 'complete') && (
          <div className="mobile-content-padding">
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 xl:gap-12 xl:items-start max-w-7xl mx-auto">
              {/* iPhone Simulator - Centered on mobile */}
              <div className="flex justify-center order-1 xl:order-none">
                <div className="w-full max-w-sm sm:max-w-none">
                  <IPhoneSimulator 
                    softwareType={currentSoftwareType}
                    isBuilding={isBuilding}
                    onBackToSelector={handleBackToChat}
                  />
                </div>
              </div>

              {/* AI Chat Interface - Full width on mobile */}
              <div className="glass-dark rounded-2xl p-4 sm:p-6 lg:p-8 order-2 xl:order-none">
                <div className="max-h-[400px] sm:max-h-[500px] xl:max-h-none overflow-hidden">
                  <AIChat 
                    onBusinessTypeDetected={handleSoftwareTypeDetected}
                    disabled={isBuilding}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA - Full width */}
        {viewState === 'complete' && (
          <div className="mobile-cta-section mt-8">
            <div className="mobile-content-padding">
              <h3 className="text-xl font-bold text-accent-400 mb-4">
                Impressed? This is just the beginning.
              </h3>
              <p className="text-neutral-100 mb-6 text-sm leading-relaxed">
                What you just saw was built in real-time using the same process I use for all my clients.
                Your actual solution will include advanced features like user authentication,
                payment processing, analytics, and custom integrations.
              </p>
              <div className="mobile-cta-buttons">
                <button 
                  onClick={handleBackToChat}
                  className="w-full bg-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Try Another Demo
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full btn-primary"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}