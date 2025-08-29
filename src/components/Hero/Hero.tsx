'use client'
import { TypingAnimation } from './TypingAnimation'
import { CounterStats } from './CounterStats'
import { FloatingParticles } from './FloatingParticles'
import { scrollToSection } from '@/lib/utils'

interface HeroProps {
  onGetStartedClick?: () => void
  onViewPortfolioClick?: () => void
  onTabChange?: (tabId: 'solutions' | 'portfolio' | 'process' | 'pricing') => void
}

export function Hero({ onGetStartedClick, onViewPortfolioClick, onTabChange }: HeroProps) {
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

  const handleViewPortfolioClick = () => {
    console.log('Hero: View portfolio clicked');
    if (onViewPortfolioClick) {
      onViewPortfolioClick();
    } else if (onTabChange) {
      onTabChange('portfolio');
    } else {
      scrollToSection('portfolio');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Professional Badge */}
        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8">
          <span className="text-neutral-100 font-medium text-sm sm:text-base">
            <span className="hidden sm:inline">Expert Developer • Orange County, CA</span>
            <span className="sm:hidden">Expert Developer • OC, CA</span>
          </span>
        </div>
        
        {/* Mobile-Optimized Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight font-display">
          <span className="block">Custom Software That</span>
          <span className="block text-accent-300 mt-2">Transforms Business</span>
        </h1>
        
        {/* Mobile-Simplified Description */}
        <div className="mb-8 sm:mb-12">
          <p className="text-lg sm:text-xl text-neutral-100 max-w-3xl mx-auto leading-relaxed px-2">
            <span className="hidden sm:inline">From simple websites to complex SaaS platforms—turn your idea into reality in weeks, not years.</span>
            <span className="sm:hidden">Turn your idea into custom software in weeks, not years.</span>
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
            className="btn-primary w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-4"
            aria-label="Book a free consultation to discuss your project"
          >
            Book Free Consultation
          </button>
          <button
            onClick={handleViewPortfolioClick}
            className="btn-text w-full sm:w-auto text-base sm:text-lg"
            aria-label="View portfolio of completed projects"
          >
            View Portfolio
          </button>
        </div>
        
        {/* Stats - Simplified on mobile */}
        <div className="mt-8 sm:mt-12">
          <CounterStats />
        </div>
      </div>
    </section>
  )
}