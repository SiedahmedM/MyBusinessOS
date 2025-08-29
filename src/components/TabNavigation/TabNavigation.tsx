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
    <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-xl shadow-neutral-900/5' : 'bg-white/90 shadow-sm'
    } border-b border-neutral-200/80 ${className}`}>
      {/* Mobile Navigation - Redesigned */}
      <div className="md:hidden mobile-container">
        <div className="py-2">
          {/* Horizontal scrollable tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-1 px-1">
            {primaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`mobile-touch flex-shrink-0 px-4 py-3 rounded-lg transition-all duration-200 min-w-[100px] ${
                  activeTab === tab.id
                    ? 'bg-accent-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-neutral-700 hover:bg-accent-50 hover:text-accent-600 border border-neutral-200'
                }`}
                style={{ minHeight: '48px' }}
                aria-label={`Switch to ${tab.title} tab`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-lg" role="img" aria-hidden="true">
                    {tab.icon}
                  </span>
                  <span className="font-medium text-xs text-center leading-tight">
                    {tab.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Active tab indicator bar */}
          <div className="mt-2 h-1 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-500 rounded-full transition-all duration-300"
              style={{
                width: `${100 / primaryTabs.length}%`,
                transform: `translateX(${primaryTabs.findIndex(tab => tab.id === activeTab) * 100}%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Enhanced */}
      <div className="hidden md:block max-w-6xl mx-auto px-4">
        <div className="flex">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 px-6 py-5 transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-accent-50/80'
                  : 'hover:bg-neutral-50/80'
              }`}
              aria-label={`Switch to ${tab.title} tab`}
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl" role="img" aria-hidden="true">
                  {tab.icon}
                </span>
                <div className="text-center">
                  <div className={`font-semibold transition-colors ${
                    activeTab === tab.id ? 'text-accent-600' : 'text-neutral-700 group-hover:text-accent-600'
                  }`}>
                    {tab.title}
                  </div>
                  {/* Show description on active or hover */}
                  <div className={`text-xs mt-1 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'text-accent-500 opacity-100' 
                      : 'text-neutral-500 opacity-0 group-hover:opacity-100'
                  }`}>
                    {tab.description}
                  </div>
                </div>
              </div>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-x-0 bottom-0 h-0.5">
                  <div className="h-full bg-accent-500 mx-6 rounded-t-full" />
                </div>
              )}
              
              {/* Hover indicator */}
              <div className={`absolute inset-x-0 bottom-0 h-0.5 transition-all duration-300 ${
                activeTab === tab.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className="h-full bg-accent-300 mx-6 rounded-t-full" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation