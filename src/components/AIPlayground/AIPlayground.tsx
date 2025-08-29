'use client'
import { useState, useCallback } from 'react'
import { IPhoneSimulator } from './IPhoneSimulator'
import { AIChat } from './AIChat'
import { logger } from '@/lib/logger'

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

  const handleSoftwareTypeDetected = useCallback((softwareType: string) => {
    try {
      console.log('AIPlayground: Software type detected:', softwareType);
      logger.info('AIPlayground: Software type detected', { softwareType })
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
              : isBuilding
              ? 'Building Your Mobile App'
              : 'Your Mobile App is Ready!'
            }
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
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
          <div className="max-w-2xl mx-auto">
            <div className="glass-dark rounded-2xl p-6 lg:p-8">
              <AIChat 
                onBusinessTypeDetected={handleSoftwareTypeDetected}
                disabled={false}
              />
            </div>
          </div>
        )}

        {/* Mobile App Demo - Responsive Layout */}
        {(viewState === 'building' || viewState === 'complete') && (
          <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8 xl:gap-12 xl:items-start">
            {/* iPhone Simulator - Full width on mobile, left column on desktop */}
            <div className="flex justify-center order-1 xl:order-none">
              <div className="w-full max-w-sm sm:max-w-none">
                <IPhoneSimulator 
                  softwareType={currentSoftwareType}
                  isBuilding={isBuilding}
                  onBackToSelector={handleBackToChat}
                />
              </div>
            </div>

            {/* AI Chat Interface - Responsive sizing */}
            <div className="glass-dark rounded-2xl p-4 sm:p-6 lg:p-8 order-2 xl:order-none">
              <div className="max-h-[400px] sm:max-h-[500px] xl:max-h-none overflow-hidden">
                <AIChat 
                  onBusinessTypeDetected={handleSoftwareTypeDetected}
                  disabled={isBuilding}
                />
              </div>
            </div>
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
                  onClick={handleBackToChat}
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