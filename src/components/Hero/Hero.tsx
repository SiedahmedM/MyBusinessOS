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
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden section-fade-bottom section-fade-bottom--black pb-16 md:pb-24">
      {/* Theme-aware background component */}
      <HeroBackground />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Professional Badge */}
        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8">
          <span className="font-sans text-neutral-100 font-medium text-sm sm:text-base">
            <span className="hidden sm:inline">Expert Developer • Orange County, CA</span>
            <span className="sm:hidden">Expert Developer • OC, CA</span>
          </span>
        </div>
        

        {/* Animated Main Heading */}
        <StaggeredText
          lines={[
            { text: "Custom Software That", className: "" },
            { text: "Transforms Business", className: "text-yellow-400 mt-2" }
          ]}
          className="font-sans font-semibold tracking-tighter2 text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8"
        />
        
        {/* Mobile-Simplified Description */}
        <div className="mb-8 sm:mb-12">
          <p className="font-sans text-base md:text-lg text-zinc-300/90 tracking-tightish max-w-3xl mx-auto px-2">
            <span className="hidden sm:inline">From simple websites to complex SaaS platforms—turn your idea into reality in weeks, not years.</span>
            <span className="sm:hidden">Turn your idea into custom software in weeks, not months.</span>
          </p>
        </div>
        
        {/* Typing Animation - Hidden on small mobile */}
        <div className="hidden sm:block">
          <TypingAnimation />
        </div>
        
        {/* Mobile-Optimized CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={handleGetStartedClick}
            className="btn-primary font-sans font-medium tracking-tightish w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4"
            aria-label="Book a free consultation to discuss your project"
          >
            Book Free Consultation
          </button>
          <button
            onClick={handleViewProjectsClick}
            className="btn-text font-sans font-medium tracking-tightish w-full sm:w-auto text-base sm:text-lg"
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