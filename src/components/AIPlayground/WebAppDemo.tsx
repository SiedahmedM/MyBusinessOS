'use client'
import { useState, useEffect } from 'react'
import { isMobile, generateDemoUrl } from '@/lib/utils'
import { logger } from '@/lib/logger'

interface WebAppDemoProps {
  businessType: string
  isBuilding: boolean
  onBackToSelector?: () => void
}

export function WebAppDemo({ businessType, isBuilding, onBackToSelector }: WebAppDemoProps) {
  const [demoUrl, setDemoUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [buildingSteps, setBuildingSteps] = useState<string[]>([])

  useEffect(() => {
    if (businessType && isBuilding) {
      generateWebDemo(businessType)
    }
  }, [businessType, isBuilding])

  const generateWebDemo = async (type: string) => {
    try {
      setIsGenerating(true)
      setError(null)
      setBuildingSteps([])
      
      logger.info('WebAppDemo: Starting demo generation', { businessType: type })
      
      const steps = [
        'Setting up database schema...',
        'Creating dashboard components...',
        'Implementing business logic...',
        'Configuring authentication...',
        'Deploying to production...',
        'Finalizing demo environment...'
      ]

      // Simulate progressive build steps
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setBuildingSteps(prev => [...prev, steps[i]])
      }

      // Generate demo URL
      const url = generateDemoUrl(type, 'web')
      setDemoUrl(url)
      setIsGenerating(false)
      
      logger.info('WebAppDemo: Demo generated successfully', { demoUrl: url })
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Demo generation failed'
      logger.error('WebAppDemo: Generation failed', { error: errorMessage })
      setError(errorMessage)
      setIsGenerating(false)
    }
  }

  const launchDemo = () => {
    try {
      if (isMobile()) {
        const proceed = confirm(
          "You're on mobile! Web demos work best on desktop. Would you like to:\n\n" +
          "✅ Continue (limited experience)\n" +
          "❌ Go back to mobile app demo"
        )
        
        if (!proceed && onBackToSelector) {
          onBackToSelector()
          return
        }
      }
      
      if (demoUrl) {
        logger.info('WebAppDemo: Launching demo', { demoUrl })
        window.open(demoUrl, '_blank', 'width=1200,height=800,toolbar=yes,scrollbars=yes,resizable=yes')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to launch demo'
      logger.error('WebAppDemo: Launch failed', { error: errorMessage })
      setError(errorMessage)
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">❌</div>
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={() => {
            setError(null)
            if (businessType) generateWebDemo(businessType)
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <div className="text-center">
        <div className="text-6xl mb-4" aria-hidden="true">💻</div>
        <h3 className="text-2xl font-bold text-white mb-4">
          {isGenerating ? 'Generating Web App...' : 'Web App Ready!'}
        </h3>
        
        {isGenerating && (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-white/80">
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3" />
              Building your custom dashboard...
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 font-mono text-sm text-left text-green-400 max-h-48 overflow-y-auto">
              {buildingSteps.map((step, index) => (
                <div key={index} className="animate-slideIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  → {step}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {demoUrl && !isGenerating && (
          <div className="space-y-4">
            <p className="text-white/80 mb-6">
              Your live web application is ready! Click below to launch it in a new tab.
            </p>
            
            <div className="bg-black/20 rounded-lg p-4 mb-6 break-all">
              <code className="text-green-400 text-sm">{demoUrl}</code>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={launchDemo}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Launch live demo in new window"
              >
                🚀 Launch Live Demo
              </button>
              
              {onBackToSelector && (
                <div>
                  <button
                    onClick={onBackToSelector}
                    className="text-white/80 hover:text-white text-sm underline"
                  >
                    ← Back to app selection
                  </button>
                </div>
              )}
            </div>
            
            {isMobile() && (
              <div className="mt-4 text-yellow-300 text-sm bg-yellow-900/20 rounded-lg p-3">
                ⚠️ You're on mobile - demo experience may be limited
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}