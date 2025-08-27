'use client'
import { useState, useCallback } from 'react'
import { IPhoneSimulator } from './IPhoneSimulator'
import { AIChat } from './AIChat'
import { AppTypeSelector } from './AppTypeSelector'
import { WebAppDemo } from './WebAppDemo'
import { logger } from '@/lib/logger'

type AppType = 'mobile' | 'web'
type ViewState = 'chat' | 'selector' | 'building' | 'complete'

export function AIPlayground() {
  const [currentBusinessType, setCurrentBusinessType] = useState('dental')
  const [selectedAppType, setSelectedAppType] = useState<AppType | null>(null)
  const [viewState, setViewState] = useState<ViewState>('chat')
  const [isBuilding, setIsBuilding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  console.log('AIPlayground: Rendering', { 
    currentBusinessType, 
    selectedAppType, 
    viewState 
  });

  const handleBusinessTypeDetected = useCallback((businessType: string) => {
    try {
      console.log('AIPlayground: Business type detected:', businessType);
      logger.info('AIPlayground: Business type detected', { businessType })
      setCurrentBusinessType(businessType)
      setViewState('selector') // Move to app type selection after business type detected
      setError(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to set business type'
      logger.error('AIPlayground: Business type detection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  const handleAppTypeSelected = useCallback((type: AppType) => {
    try {
      logger.info('AIPlayground: App type selected', { appType: type })
      setSelectedAppType(type)
      setViewState('building')
      setIsBuilding(true)
      setError(null)
      
      // Auto transition to complete after build simulation
      setTimeout(() => {
        setIsBuilding(false)
        setViewState('complete')
      }, 6000) // Adjust timing based on build duration
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to select app type'
      logger.error('AIPlayground: App type selection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  const handleBackToSelector = useCallback(() => {
    try {
      logger.info('AIPlayground: Returning to selector')
      setSelectedAppType(null)
      setViewState('chat')
      setIsBuilding(false)
      setError(null)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to return to selector'
      logger.error('AIPlayground: Back to selector failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  if (error) {
    return (
      <section id="ai-playground" className="section-padding bg-purple-gradient">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">❌</div>
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
      </section>
    )
  }

  return (
    <section id="ai-playground" className="section-padding bg-purple-gradient">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-white mb-6">
            {viewState === 'chat' 
              ? 'Tell Our AI About Your Business'
              : viewState === 'selector' 
              ? 'Choose Your Solution Type'
              : selectedAppType === 'mobile'
              ? 'Building Your Mobile App'
              : 'Creating Your Web Application'
            }
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            {viewState === 'chat'
              ? 'Chat with our AI to describe your business. It will understand your needs and prepare the perfect custom solution.'
              : viewState === 'selector'
              ? 'Great! Now choose whether you need a mobile app or web application. Watch as it builds your custom solution in real-time.'
              : isBuilding
              ? 'Your custom solution is being built with enterprise-grade features tailored to your business needs.'
              : 'Your solution is ready! This demonstrates the quality and speed of our development process.'
            }
          </p>
        </div>

        {/* AI Chat Interface - Initial State */}
        {viewState === 'chat' && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-dark rounded-2xl p-6 lg:p-8">
              <AIChat 
                onBusinessTypeDetected={handleBusinessTypeDetected}
                disabled={false}
              />
            </div>
          </div>
        )}

        {/* App Type Selector */}
        <AppTypeSelector 
          onTypeSelected={handleAppTypeSelected}
          isVisible={viewState === 'selector'}
        />

        {/* Two Column Layout - Mobile App Demo */}
        {selectedAppType === 'mobile' && (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: iPhone Simulator */}
            <div className="flex justify-center">
              <IPhoneSimulator 
                businessType={currentBusinessType}
                isBuilding={isBuilding}
                onBackToSelector={handleBackToSelector}
              />
            </div>

            {/* Right: AI Chat Interface */}
            <div className="glass-dark rounded-2xl p-6 lg:p-8">
              <AIChat 
                onBusinessTypeDetected={handleBusinessTypeDetected}
                disabled={isBuilding}
              />
            </div>
          </div>
        )}

        {/* Web App Demo */}
        {selectedAppType === 'web' && (
          <div className="max-w-2xl mx-auto">
            <WebAppDemo 
              businessType={currentBusinessType}
              isBuilding={isBuilding}
              onBackToSelector={handleBackToSelector}
            />
          </div>
        )}

        {/* Bottom CTA */}
        {viewState === 'complete' && (
          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Impressed? This is just the beginning.
              </h3>
              <p className="text-purple-200 mb-6">
                What you just saw was built in real-time using the same process I use for all my clients. 
                Your actual solution will include advanced features like user authentication, 
                payment processing, analytics, and custom integrations.
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <button 
                  onClick={handleBackToSelector}
                  className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                >
                  Try Another Demo
                </button>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg btn-hover focus-outline"
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