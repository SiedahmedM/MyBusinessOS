'use client'
import { useState, useEffect } from 'react'
import { scrollToSection } from '@/lib/utils'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 100vh
      const scrolled = window.scrollY > window.innerHeight
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    console.log('FloatingCTA: Clicked, scrolling to AI playground');
    scrollToSection('ai-playground')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 no-print">
      <button
        onClick={handleClick}
        className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 max-w-xs"
      >
        <div className="flex items-center">
          <div className="animate-pulse mr-3 text-xl">💡</div>
          <div className="text-left">
            <div className="font-semibold text-sm">Need custom software?</div>
            <div className="text-xs opacity-90">Try our AI solution builder</div>
          </div>
        </div>
        
        {/* Notification dot */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </button>
    </div>
  )
}