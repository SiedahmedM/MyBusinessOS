'use client'
import { useState, useEffect, useCallback } from 'react'
import { getBusinessByType } from '@/lib/openai'
import { logger } from '@/lib/logger'

interface AppFeature {
  icon: string
  title: string
  description: string
}

interface IPhoneSimulatorProps {
  businessType: string
  isBuilding: boolean
  onBackToSelector?: () => void
}

export function IPhoneSimulator({ businessType, isBuilding, onBackToSelector }: IPhoneSimulatorProps) {
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
      logger.info('iPhoneSimulator: Starting app build', { businessType: type })
      
      const businessData = getBusinessByType(type)
      if (!businessData) {
        throw new Error('Business type not supported')
      }

      // Reset state
      setFeatures([])
      setCurrentFeatureIndex(-1)
      setBuildProgress(10)
      
      // Update header with animation delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAppTitle(businessData.title)
      setAppSubtitle(businessData.name + " Management")
      setBuildProgress(25)

      // Build features progressively
      for (let i = 0; i < businessData.features.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        setCurrentFeatureIndex(i)
        setFeatures(prev => [...prev, businessData.features[i]])
        setBuildProgress(25 + ((i + 1) / businessData.features.length) * 75)
        
        logger.info('iPhoneSimulator: Feature added', { 
          featureIndex: i, 
          featureTitle: businessData.features[i].title 
        })
      }
      
      logger.info('iPhoneSimulator: App build completed', { 
        featuresCount: businessData.features.length 
      })
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'App build failed'
      logger.error('iPhoneSimulator: Build failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  useEffect(() => {
    if (businessType && isBuilding) {
      buildAppSequence(businessType)
    }
  }, [businessType, isBuilding, buildAppSequence])

  const getGradientColor = (type: string) => {
    switch (type) {
      case 'dental':
        return 'linear-gradient(135deg, #10b981, #059669)'
      case 'auto':
        return 'linear-gradient(135deg, #667eea, #764ba2)'
      case 'restaurant':
        return 'linear-gradient(135deg, #f59e0b, #d97706)'
      case 'construction':
        return 'linear-gradient(135deg, #dc2626, #b91c1c)'
      default:
        return 'linear-gradient(135deg, #667eea, #764ba2)'
    }
  }

  if (error) {
    return (
      <div className="relative mx-auto w-[375px] h-[812px]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center h-full flex flex-col justify-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => {
              setError(null)
              if (businessType) buildAppSequence(businessType)
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry Build
          </button>
          {onBackToSelector && (
            <button 
              onClick={onBackToSelector}
              className="mt-2 text-gray-600 text-sm underline"
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
      {/* iPhone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl mx-auto">
        {/* Notch */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[140px] h-[30px] bg-black rounded-full z-20" />
        
        {/* Screen */}
        <div className="w-full h-full bg-gray-900 rounded-[35px] overflow-hidden relative">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 text-white text-sm font-semibold bg-black relative z-10">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>●●●●●</span>
              <span>📶</span>
              <span>🔋</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* App Header */}
          <div 
            className="px-6 py-8 text-center text-white relative z-5"
            style={{
              background: getGradientColor(businessType)
            }}
          >
            <h1 className="text-2xl font-bold mb-2">{appTitle}</h1>
            <p className="text-white/90">{appSubtitle}</p>
            
            {isBuilding && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  <span className="text-sm">Building features...</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${buildProgress}%` }}
                    aria-label={`Build progress: ${buildProgress}%`}
                  />
                </div>
                <div className="text-xs text-white/80">{Math.round(buildProgress)}% complete</div>
              </div>
            )}
          </div>
          
          {/* App Body */}
          <div className="flex-1 bg-gray-50 px-4 py-4 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
            {features.length === 0 && !isBuilding && (
              <div className="text-center py-20 text-gray-500">
                <div className="text-4xl mb-4" aria-hidden="true">⚡</div>
                <div className="text-lg font-semibold mb-2">Ready to Build</div>
                <div className="text-sm">Tell the AI what you need →</div>
              </div>
            )}
            
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 mb-3 shadow-sm border-2 border-transparent hover:border-blue-200 transition-all duration-300 animate-slideIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
                role="article"
                aria-label={`Feature: ${feature.title}`}
              >
                <div className="text-2xl mb-2" aria-hidden="true">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
            
            {/* Building indicator */}
            {isBuilding && features.length < 4 && (
              <div className="bg-white rounded-lg p-4 mb-3 shadow-sm opacity-50" aria-hidden="true">
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            )}
            
            {/* Back button when build is complete */}
            {!isBuilding && features.length > 0 && onBackToSelector && (
              <div className="text-center mt-6">
                <button
                  onClick={onBackToSelector}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm transition-colors"
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