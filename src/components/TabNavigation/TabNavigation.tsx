'use client'
import { useState, useEffect, useCallback } from 'react'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'

interface TabNavigationProps {
  activeTab: Tab['id']
  onTabChange: (tabId: Tab['id']) => void
  className?: string
}

export function TabNavigation({ activeTab, onTabChange, className = '' }: TabNavigationProps) {
  const [error, setError] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleTabClick = useCallback((tabId: Tab['id']) => {
    try {
      logger.info('TabNavigation: Tab clicked', { tabId })
      setError(null)
      onTabChange(tabId)
      
      if (typeof window !== 'undefined') {
        const element = document.getElementById(tabId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        
        window.history.pushState(null, '', `#${tabId}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to switch tab'
      logger.error('TabNavigation: Tab change failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [onTabChange])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
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
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-sm'
    } ${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="flex">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 px-6 py-4 text-left transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-purple-50 border-b-2 border-purple-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {tab.icon}
                </span>
                <div>
                  <div className={`font-semibold transition-colors ${
                    activeTab === tab.id ? 'text-purple-600' : 'text-gray-900 group-hover:text-purple-600'
                  }`}>
                    {tab.title}
                  </div>
                  <div className={`text-sm transition-colors ${
                    activeTab === tab.id ? 'text-purple-500' : 'text-gray-500'
                  }`}>
                    {tab.description}
                  </div>
                </div>
              </div>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-2">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-shrink-0 px-4 py-3 mr-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-lg" role="img" aria-hidden="true">
                  {tab.icon}
                </span>
                <span className="font-medium text-sm">
                  {tab.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation