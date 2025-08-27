'use client'
import { useState, useEffect } from 'react'
import { getBusinessByType, businessTypes } from '@/lib/openai'
import type { AppFeature } from '@/types'

interface iPhoneSimulatorProps {
  businessType: string;
}

export function iPhoneSimulator({ businessType }: iPhoneSimulatorProps) {
  const [appTitle, setAppTitle] = useState("Your Business App")
  const [features, setFeatures] = useState<AppFeature[]>([])
  const [isBuilding, setIsBuilding] = useState(false)

  useEffect(() => {
    console.log('iPhoneSimulator: Business type changed to:', businessType);
    if (businessType) {
      buildApp(businessType)
    }
  }, [businessType])

  const buildApp = async (type: string) => {
    setIsBuilding(true)
    setFeatures([])
    
    const businessData = getBusinessByType(type)
    if (!businessData) return

    console.log('iPhoneSimulator: Building app for business:', businessData.name);
    setAppTitle(businessData.title)

    // Simulate building animation
    for (let i = 0; i < businessData.features.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setFeatures(prev => [...prev, businessData.features[i]])
    }
    
    setIsBuilding(false)
  }

  return (
    <div className="relative">
      {/* iPhone frame */}
      <div className="iphone-frame w-[375px] h-[812px] rounded-[40px] p-2 shadow-2xl mx-auto">
        {/* Dynamic notch */}
        <div className="iphone-notch absolute top-5 left-1/2 transform -translate-x-1/2 w-[140px] h-[30px] z-10" />
        
        {/* Screen */}
        <div className="iphone-screen w-full h-full rounded-[35px] overflow-hidden">
          {/* Status bar */}
          <div className="flex justify-between px-6 pt-3 pb-2 text-white text-sm font-semibold bg-black">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <span>📶</span>
              <span>📶</span>
              <span>🔋</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* App content */}
          <div className="flex-1 bg-gradient-to-br from-purple-500 to-purple-600">
            {/* Dynamic app header */}
            <div className="text-center py-8 text-white">
              <h1 className="text-2xl font-bold">{appTitle}</h1>
              {isBuilding ? (
                <div className="flex items-center justify-center mt-2">
                  <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <p className="opacity-90">Building in real-time...</p>
                </div>
              ) : (
                <p className="opacity-90">Ready to transform your business</p>
              )}
            </div>
            
            {/* Features list */}
            <div className="bg-gray-50 flex-1 p-4 space-y-3" style={{ minHeight: '500px' }}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-sm animate-slideIn"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
              
              {/* Building placeholder */}
              {isBuilding && features.length < 4 && (
                <div className="bg-white p-4 rounded-lg shadow-sm opacity-50">
                  <div className="animate-pulse">
                    <div className="w-8 h-8 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              )}
              
              {/* Empty state */}
              {!isBuilding && features.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <div className="text-4xl mb-4">💬</div>
                  <p>Tell me about your business to see your custom app!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-80" />
        </div>
      </div>
    </div>
  )
}