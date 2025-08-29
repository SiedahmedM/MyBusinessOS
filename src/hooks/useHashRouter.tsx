'use client'
import { useState, useEffect, useCallback } from 'react'
import { logger } from '@/lib/logger'

export type TabId = 'solutions' | 'process' | 'pricing'

export function useHashRouter(defaultTab: TabId = 'solutions') {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab)

  // Initialize from URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId
      const validTabs: TabId[] = ['solutions', 'process', 'pricing']
      
      if (validTabs.includes(hash)) {
        setActiveTab(hash)
        logger.info('HashRouter: Tab changed via URL', { hash })
      }
    }

    // Set initial tab from URL
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const navigateToTab = useCallback((tabId: TabId) => {
    try {
      setActiveTab(tabId)
      window.history.pushState(null, '', `#${tabId}`)
      logger.info('HashRouter: Navigated to tab', { tabId })
      
      // Smooth scroll to section
      const element = document.getElementById(tabId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } catch (error) {
      logger.error('HashRouter: Navigation failed', { error, tabId })
    }
  }, [])

  return { activeTab, navigateToTab }
}