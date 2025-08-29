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
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300 ${
      isScrolled ? 'shadow-lg bg-white/98' : 'shadow-sm'
    } ${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="flex">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 px-4 py-4 text-left transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-primary-50 border-b-2 border-primary-500'
                  : 'hover:bg-neutral-50'
              }`}
              aria-label={`Switch to ${tab.title} tab`}
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl" role="img" aria-hidden="true">
                  {tab.icon}
                </span>
                <div className="text-center">
                  <div className={`font-semibold transition-colors ${
                    activeTab === tab.id ? 'text-primary-600' : 'text-neutral-700 group-hover:text-primary-600'
                  }`}>
                    {tab.title}
                  </div>
                  {/* Show description on hover only */}
                  <div className={`text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    activeTab === tab.id ? 'text-primary-500' : 'text-neutral-500'
                  }`}>
                    {tab.description}
                  </div>
                </div>
              </div>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-gradient" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide px-2 py-3 gap-2">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              aria-label={`Switch to ${tab.title} tab`}
            >
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-base" role="img" aria-hidden="true">
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