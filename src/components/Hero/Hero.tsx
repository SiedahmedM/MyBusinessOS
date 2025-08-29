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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Professional Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <span className="text-neutral-100 font-medium">
            Expert Developer • Orange County, CA
          </span>
        </div>
        
        {/* Simplified Main Heading */}
        <h1 className="hero-title text-white mb-8">
          Custom Software That
          <br />
          <span className="text-accent-300">Transforms Business</span>
        </h1>
        
        {/* Condensed Description */}
        <div className="mb-12">
          <p className="body-lg text-neutral-100 max-w-4xl mx-auto leading-relaxed">
            From simple websites to complex SaaS platforms—turn your idea into reality in weeks, not years.
          </p>
        </div>
        
        {/* Typing Animation */}
        <TypingAnimation />
        
        {/* Streamlined CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            onClick={handleGetStartedClick}
            className="btn-primary"
            aria-label="Book a free consultation to discuss your project"
          >
            Book Free Consultation
          </button>
          <button
            onClick={handleViewPortfolioClick}
            className="btn-text"
            aria-label="View portfolio of completed projects"
          >
            View Portfolio
          </button>
        </div>
        
        {/* Stats */}
        <CounterStats />
      </div>
    </section>
  )
}