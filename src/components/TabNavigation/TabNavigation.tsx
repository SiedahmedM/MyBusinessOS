'use client'
import { useState, useEffect, useCallback } from 'react'
import { primaryTabs } from '@/types/tabs'
import type { Tab } from '@/types/tabs'
import { logger } from '@/lib/logger'
import { Logo } from '@/components/common/Logo'

interface TabNavigationProps {
  activeTab: Tab['id']
  onTabChange: (tabId: Tab['id']) => void
  className?: string
}

export function TabNavigation({ activeTab, onTabChange, className = '' }: TabNavigationProps) {
  const [error, setError] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTabClick = useCallback((tabId: Tab['id']) => {
    try {
      logger.info('TabNavigation: Tab clicked', { tabId })
      setError(null)
      onTabChange(tabId)
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

  const dropdownClasses = (open: boolean) =>
    `absolute right-0 mt-2 w-56 rounded-lg border border-neutral-800 bg-neutral-900/95 backdrop-blur-xl shadow-xl shadow-black/40 overflow-hidden transform origin-top-right transition-all duration-150 ${
      open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
    }`

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-sm bg-transparent' : 'bg-transparent'
    } ${className}`}>
      {/* Mobile Navigation - Top-right dropdown */}
      <div className="md:hidden px-4">
        <div className={`mx-auto transition-all ${isScrolled ? 'mt-0' : 'mt-6'}`}>
          <div className="relative flex items-center justify-between">
            <Logo variant="header" size="xl" />
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                className="flex items-center justify-center h-10 w-10 rounded-lg text-white/90 hover:text-white transition-colors"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Open navigation menu"
              >
                <span className="sr-only">Toggle menu</span>
                <span aria-hidden className="relative block h-4 w-5">
                  <span className={`absolute left-0 top-0 h-0.5 w-5 bg-neutral-200 transition-transform duration-200 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}/>
                  <span className={`absolute left-0 top-1/2 -mt-[1px] h-0.5 w-5 bg-neutral-200 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}/>
                  <span className={`absolute left-0 bottom-0 h-0.5 w-5 bg-neutral-200 transition-transform duration-200 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}/>
                </span>
              </button>
              <div role="menu" className={dropdownClasses(menuOpen)}>
                {primaryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="menuitem"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(false)
                      handleTabClick(tab.id)
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent-500/10 text-accent-300'
                        : 'text-neutral-200 hover:bg-neutral-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg" aria-hidden>{tab.icon}</span>
                      <div>
                        <div className="font-medium">{tab.title}</div>
                        <div className="text-xs text-neutral-400">{tab.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Top-right dropdown */}
      <div className="hidden md:block px-4">
        <div className={`mx-auto max-w-5xl transition-all ${isScrolled ? 'mt-0' : 'mt-12'}`}>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-2 shadow-lg">
            {/* Desktop Logo */}
            <div className="flex items-center">
              <Logo variant="header" size="xl" className="logo-container" />
            </div>

            {/* Centered links */}
            <div className="flex items-center gap-6 text-sm">
              {primaryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-2 py-1 transition-colors ${
                    activeTab === tab.id ? 'text-accent-300' : 'text-neutral-200 hover:text-white'
                  }`}
                  aria-label={`Switch to ${tab.title} tab`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Right CTA */}
            <div className="flex items-center">
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg bg-accent-500 text-black font-medium hover:bg-accent-400 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TabNavigation
