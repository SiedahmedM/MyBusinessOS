'use client'
import { TypingAnimation } from './TypingAnimation'
import { StaggeredText } from './StaggeredText'
import { HeroBackground } from './HeroBackground'
import { scrollToSection } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface HeroProps {
  onGetStartedClick?: () => void
  onTabChange?: (tabId: 'solutions' | 'process' | 'pricing') => void
}

export function Hero({ onGetStartedClick, onTabChange }: HeroProps) {
  console.log('Hero: Rendering component');

  const handleGetStartedClick = () => {
    console.log('Hero: Get started clicked');
    if (onGetStartedClick) {
      onGetStartedClick();
    } else if (onTabChange) {
      onTabChange('solutions');
    } else {
      scrollToSection('solutions');
    }
  };

  const handleOurServicesClick = () => {
    console.log('Hero: Our Services clicked');
    const element = document.getElementById('services') || document.getElementById('solutions')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  };

  return (
    <section className="relative min-h-[74vh] lg:min-h-[70vh] flex items-center justify-center overflow-x-hidden section-fade-bottom section-fade-bottom--black pb-16 md:pb-20">
      {/* Theme-aware background component */}
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Professional Badge removed by request */}
        

        {/* Animated Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
        <StaggeredText
          lines={[
            { text: "We build custom software that", className: "" },
            { text: "actually fits how your business operates.", className: "text-accent-500 mt-2" }
          ]}
          className="font-sans font-semibold tracking-tighter2 text-left sm:text-center text-4xl md:text-6xl text-white mb-3 sm:mb-5"
        />
        </motion.div>
        {/* Supporting promise */}
        <motion.div
          className="flex justify-start sm:justify-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-200 text-sm">
            No more forcing your processes into generic tools.
          </span>
        </motion.div>
        
        {/* Mobile-Simplified Description */}
        <div className="mb-8 sm:mb-12">
          <p className="font-sans text-base md:text-lg text-zinc-300/90 tracking-tightish max-w-3xl sm:mx-auto sm:text-center text-left px-1">
            Tell us how your business operates, and we'll build software that eliminates your biggest operational headaches.
          </p>
        </div>
        
        {/* Typing Animation - Hidden on small mobile */}
        <div className="hidden sm:block">
          <TypingAnimation />
        </div>
        
        {/* Mobile-Optimized CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-center items-start sm:items-center mb-8 sm:mb-12 max-w-md sm:max-w-none sm:mx-auto">
          {/* Mobile: single Get in touch button */}
          <a
            href="#contact"
            className="sm:hidden w-full px-6 py-4 rounded-xl bg-accent-500 text-black font-semibold text-lg text-center shadow-lg shadow-black/30 hover:bg-accent-400 transition-colors"
            aria-label="Get in touch"
          >
            Get in touch
          </a>
          {/* Desktop/tablet: original CTAs */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex btn-primary font-sans font-medium tracking-tightish text-base sm:text-lg px-8 sm:px-10 py-4"
            aria-label="Book a free consultation to discuss your project"
          >
            Book Free Consultation
          </button>
          <button
            onClick={handleOurServicesClick}
            className="hidden sm:inline-flex btn-text font-sans font-medium tracking-tightish text-base sm:text-lg"
            aria-label="Jump to our services section"
          >
            Our Services
          </button>
        </div>
        
        {/* Experience logos section removed by request */}
        {/* Scroll cue */}
        <motion.button
          onClick={handleOurServicesClick}
          aria-label="Scroll to services"
          className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-black/40 text-white/80 hover:text-white hover:border-white/40"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ delay: 0.8, duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.button>
      </div>
    </section>
  )
}
