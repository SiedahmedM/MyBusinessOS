'use client'
import { useState, useEffect } from 'react'
import { scrollToSection } from '@/lib/utils'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 100vh
      const scrolled = window.scrollY > window.innerHeight
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleClick = () => {
    console.log('FloatingCTA: Clicked, scrolling to contact form');
    scrollToSection('contact')
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      <button
        onClick={handleClick}
        className="group relative bg-accent-gradient text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-accent-600"
        aria-label="Get started with custom software consultation"
      >
        <div className="flex items-center max-w-xs">
          <div className="mr-3 text-xl" aria-hidden="true">📅</div>
          <div className="text-left">
            <div className="font-semibold text-sm">Ready to start?</div>
            <div className="text-xs opacity-90 hidden sm:block">Book free consultation</div>
          </div>
        </div>
        
        {/* Dismiss button for mobile */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-600 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors md:hidden"
          aria-label="Dismiss floating call-to-action"
        >
          <span className="text-white text-xs">×</span>
        </button>

        {/* Subtle hover effect */}
        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </div>
  )
}