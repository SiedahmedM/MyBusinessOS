'use client'
import { useState } from 'react'
import { logger } from '@/lib/logger'

interface AppTypeSelectorProps {
  onTypeSelected: (type: 'mobile' | 'web') => void
  isVisible: boolean
}

export function AppTypeSelector({ onTypeSelected, isVisible }: AppTypeSelectorProps) {
  const [error, setError] = useState<string | null>(null)

  const handleTypeSelection = (type: 'mobile' | 'web') => {
    try {
      logger.info('AppTypeSelector: Type selected', { type })
      setError(null)
      onTypeSelected(type)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Selection failed'
      logger.error('AppTypeSelector: Selection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }

  if (!isVisible) return null

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="text-center mb-8 animate-fadeInUp">
      <h3 className="text-2xl font-bold text-white mb-6">
        What type of solution do you need?
      </h3>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => handleTypeSelection('mobile')}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Select mobile app solution"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
            📱
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Mobile App</h4>
          <p className="text-white/80">iOS/Android app for customers</p>
        </button>
        
        <button
          onClick={() => handleTypeSelection('web')}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Select web application solution"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">
            💻
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Web Application</h4>
          <p className="text-white/80">Browser-based business dashboard</p>
        </button>
      </div>
    </div>
  )
}