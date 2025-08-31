'use client'
import { useState, useEffect, useCallback } from 'react'
import { softwareTypes } from '@/types/tabs'
import { logger } from '@/lib/logger'

interface AppFeature {
  icon: string
  title: string
  description: string
}

interface IPhoneSimulatorProps {
  softwareType: string
  isBuilding: boolean
  onBackToSelector?: () => void
}

// Helper function to get mobile app features for each software type
function getMobileFeaturesForSoftwareType(type: string): AppFeature[] {
  const featureMap: Record<string, AppFeature[]> = {
    'business-hub': [
      { icon: '◆', title: 'Customer Management', description: 'Complete CRM on mobile' },
      { icon: '◆', title: 'Real-time Dashboard', description: 'Business metrics at a glance' },
      { icon: '◆', title: 'Smart Scheduling', description: 'AI-powered appointment booking' },
      { icon: '◆', title: 'Sales Tracking', description: 'Revenue and performance data' }
    ],
    'agency-saas': [
      { icon: '◆', title: 'Client Dashboard', description: 'Self-service client portal' },
      { icon: '◆', title: 'Automated Reports', description: 'Generate reports automatically' },
      { icon: '◆', title: 'Subscription Billing', description: 'Recurring revenue management' },
      { icon: '◆', title: 'Multi-tenant Access', description: 'Secure client separation' }
    ],
    'ecommerce': [
      { icon: '◆', title: 'Mobile Shopping', description: 'Optimized mobile commerce' },
      { icon: '◆', title: 'Payment Processing', description: 'Secure mobile payments' },
      { icon: '◆', title: 'Order Tracking', description: 'Real-time delivery updates' },
      { icon: '⭐', title: 'Reviews & Ratings', description: 'Customer feedback system' }
    ],
    'mobile-app': [
      { icon: '◆', title: 'Native Performance', description: 'Lightning-fast user experience' },
      { icon: '◆', title: 'Offline Sync', description: 'Works without internet' },
      { icon: '◆', title: 'Push Notifications', description: 'Re-engage users automatically' },
      { icon: '◆', title: 'Custom UI/UX', description: 'Branded mobile experience' }
    ],
    'automation': [
      { icon: '◆', title: 'Mobile Analytics', description: 'Data insights on-the-go' },
      { icon: '◆', title: 'Real-time Charts', description: 'Live performance metrics' },
      { icon: '◆', title: 'Alert System', description: 'Instant mobile notifications' },
      { icon: '◆', title: 'Custom Reports', description: 'Generate reports anywhere' }
    ],
    'ai-services': [
      { icon: '◆', title: 'AI Assistant', description: 'Smart mobile automation' },
      { icon: '◆', title: 'Document Scanner', description: 'AI-powered document processing' },
      { icon: '◆', title: 'Voice Commands', description: 'Hands-free operation' },
      { icon: '◆', title: 'Auto Workflows', description: 'Intelligent task automation' }
    ]
  }

  return featureMap[type] || featureMap['business-hub']
}

export function IPhoneSimulator({ softwareType, isBuilding, onBackToSelector }: IPhoneSimulatorProps) {
  const [appTitle, setAppTitle] = useState("Your Business App")
  const [appSubtitle, setAppSubtitle] = useState("Building in real-time...")
  const [features, setFeatures] = useState<AppFeature[]>([])
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  const [buildProgress, setBuildProgress] = useState(0)

  const buildAppSequence = useCallback(async (type: string) => {
    try {
      setError(null)
      setBuildProgress(0)
      logger.info('iPhoneSimulator: Starting app build', { softwareType: type })
      
      // Get software type data
      const softwareData = softwareTypes.find(s => s.id === type)
      if (!softwareData) {
        throw new Error('Software type not supported')
      }

      // Get mobile features for this software type
      const mobileFeatures = getMobileFeaturesForSoftwareType(type)

      // Reset state
      setFeatures([])
      setCurrentFeatureIndex(-1)
      setBuildProgress(10)
      
      // Update header with animation delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAppTitle(softwareData.title)
      setAppSubtitle(`Mobile ${softwareData.description}`)
      setBuildProgress(25)

      // Build features progressively
      for (let i = 0; i < mobileFeatures.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        setCurrentFeatureIndex(i)
        setFeatures(prev => [...prev, mobileFeatures[i]])
        setBuildProgress(25 + ((i + 1) / mobileFeatures.length) * 75)
        
        logger.info('iPhoneSimulator: Feature added', { 
          featureIndex: i, 
          featureTitle: mobileFeatures[i].title 
        })
      }
      
      logger.info('iPhoneSimulator: App build completed', { 
        featuresCount: mobileFeatures.length 
      })
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'App build failed'
      logger.error('iPhoneSimulator: Build failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  useEffect(() => {
    if (softwareType && isBuilding) {
      buildAppSequence(softwareType)
    }
  }, [softwareType, isBuilding, buildAppSequence])

  const getGradientColor = () => 'linear-gradient(135deg, #000000, #1a1a1a, #facc15)'

  if (error) {
    return (
      <div className="relative mx-auto w-full max-w-[260px] h-[540px] sm:max-w-[375px] sm:h-[812px]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center h-full flex flex-col justify-center">
          <div className="text-4xl mb-4">◆</div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => {
              setError(null)
              if (softwareType) buildAppSequence(softwareType)
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry Build
          </button>
          {onBackToSelector && (
            <button 
              onClick={onBackToSelector}
              className="mt-2 text-neutral-600 text-sm underline"
            >
              ← Back to selection
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto" style={{ perspective: '1000px' }}>
      {/* iPhone Frame - Responsive sizing */}
      <div className="relative w-full max-w-[260px] h-[540px] sm:max-w-[375px] sm:h-[812px] bg-black rounded-[32px] sm:rounded-[40px] p-1.5 sm:p-2 shadow-2xl mx-auto">
        {/* Notch - Responsive sizing */}
        <div className="absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2 w-[120px] sm:w-[140px] h-[24px] sm:h-[30px] bg-black rounded-full z-20" />
        
        {/* Screen - Responsive sizing */}
        <div className="w-full h-full bg-neutral-900 rounded-[28px] sm:rounded-[35px] overflow-hidden relative">
          {/* Status Bar - Responsive padding and text */}
          <div className="flex justify-between items-center px-3 sm:px-6 pt-3 sm:pt-4 pb-1 sm:pb-2 text-white text-xs sm:text-sm font-semibold bg-black relative z-10">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>●●●●●</span>
              <span>◆</span>
              <span>◆</span>
              <span className="hidden sm:inline">100%</span>
            </div>
          </div>
          
          {/* App Header - Responsive padding and text */}
          <div 
            className="px-3 sm:px-6 py-4 sm:py-8 text-center text-white relative z-5"
            style={{
              background: getGradientColor()
            }}
          >
            <h1 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{appTitle}</h1>
            <p className="text-white/90 text-sm sm:text-base">{appSubtitle}</p>
            
            {isBuilding && (
              <div className="mt-3 sm:mt-4 space-y-2">
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  <span className="text-xs sm:text-sm">Building features...</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-white h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${buildProgress}%` }}
                    aria-label={`Build progress: ${buildProgress}%`}
                  />
                </div>
                <div className="text-xs text-white/80">{Math.round(buildProgress)}% complete</div>
              </div>
            )}
          </div>
          
          {/* App Body - Responsive padding */}
          <div className="flex-1 bg-neutral-50 px-2 sm:px-4 py-2 sm:py-4 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
            {features.length === 0 && !isBuilding && (
              <div className="text-center py-12 sm:py-20 text-gray-500">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4" aria-hidden="true">◆</div>
                <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Ready to Build</div>
                <div className="text-xs sm:text-sm">Tell the AI what you need →</div>
              </div>
            )}
            
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 shadow-sm border-2 border-transparent hover:border-accent-200 transition-all duration-300 animate-slideIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
                role="article"
                aria-label={`Feature: ${feature.title}`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2" aria-hidden="true">{feature.icon}</div>
                <h3 className="font-bold text-neutral-900 mb-1 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
            
            {/* Building indicator */}
            {isBuilding && features.length < 4 && (
              <div className="bg-white rounded-lg p-4 mb-3 shadow-sm opacity-50" aria-hidden="true">
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-neutral-300 rounded mb-2" />
                  <div className="h-4 bg-neutral-300 rounded mb-2" />
                  <div className="h-3 bg-neutral-200 rounded w-3/4" />
                </div>
              </div>
            )}
            
            {/* Back button when build is complete */}
            {!isBuilding && features.length > 0 && onBackToSelector && (
              <div className="text-center mt-6">
                <button
                  onClick={onBackToSelector}
                  className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-6 py-2 rounded-lg text-sm transition-colors"
                >
                  ← Build Different App
                </button>
              </div>
            )}
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/80 rounded-full" />
        </div>
      </div>
    </div>
  )
}