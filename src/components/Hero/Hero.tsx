'use client'
import { TypingAnimation } from './TypingAnimation'
import { ExperienceLogos } from './ExperienceLogos'
import { StaggeredText } from './StaggeredText'
import { HeroBackground } from './HeroBackground'
import { scrollToSection } from '@/lib/utils'
import { motion } from 'framer-motion'

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

  const handleViewProjectsClick = () => {
    console.log('Hero: View projects clicked');
    // Scroll to the project showcase section within solutions
    const element = document.getElementById('solutions')
    if (element) {
      // Scroll to the project showcase section
      setTimeout(() => {
        const showcase = document.querySelector('.project-showcase')
        if (showcase) {
          showcase.scrollIntoView({ behavior: 'smooth' })
        } else {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[80vh] flex items-center justify-center overflow-x-hidden section-fade-bottom section-fade-bottom--black pb-20 md:pb-24">
      {/* Theme-aware background component */}
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Professional Badge removed by request */}
        

        {/* Animated Main Heading */}
        <StaggeredText
          lines={[
            { text: "Custom Software That", className: "" },
            { text: "Transforms Business", className: "text-accent-500 mt-2" }
          ]}
          className="font-sans font-semibold tracking-tighter2 text-left sm:text-center text-5xl md:text-6xl text-white mb-6 sm:mb-8"
        />
        
        {/* Mobile-Simplified Description */}
        <div className="mb-8 sm:mb-12">
          <p className="font-sans text-base md:text-lg text-zinc-300/90 tracking-tightish max-w-3xl sm:mx-auto sm:text-center text-left px-1">
            From simple websites to complex SaaS platforms—turn your idea into reality in weeks, not months.
          </p>
        </div>
        
        {/* Typing Animation - Hidden on small mobile */}
        <div className="hidden sm:block">
          <TypingAnimation />
        </div>
        
        {/* Mobile-Optimized CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-center items-start sm:items-center mb-12 sm:mb-16 max-w-md sm:max-w-none sm:mx-auto">
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
            onClick={handleViewProjectsClick}
            className="hidden sm:inline-flex btn-text font-sans font-medium tracking-tightish text-base sm:text-lg"
            aria-label="View examples of completed projects"
          >
            View Examples
          </button>
        </div>
        
        {/* Industry experience logos */}
        <div className="mt-8 sm:mt-12 relative z-30">
          <ExperienceLogos />
        </div>
      </div>
    </section>
  )
}
