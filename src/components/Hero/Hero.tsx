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
        {/* Enhanced Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full glass-hero-stats mb-8">
          <span className="text-gray-900 font-medium">
            Expert Developer • Orange County • Any Software Imaginable
          </span>
        </div>
        
        {/* Updated Main Heading */}
        <h1 className="hero-title text-white mb-8">
          I Build Any Software
          <br />
          <span className="text-yellow-300">You Can Imagine</span>
        </h1>
        
        {/* Enhanced Description */}
        <div className="space-y-4 mb-8">
          <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            From simple websites to complex SaaS platforms - 
            <strong className="text-white"> if you can describe it, I can build it</strong>
          </p>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            Enterprise-level solutions at freelancing prices
          </p>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            Turn your business idea into reality in weeks, not years
          </p>
        </div>
        
        {/* Typing Animation */}
        <TypingAnimation />
        
        {/* Updated CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleGetStartedClick}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg btn-hover focus-outline"
          >
            See What I Can Build →
          </button>
          <button
            onClick={handleViewPortfolioClick}
            className="px-8 py-4 glass-hero-stats text-gray-900 font-bold rounded-lg btn-hover focus-outline"
          >
            View My Portfolio
          </button>
        </div>
        
        {/* Stats */}
        <CounterStats />
      </div>
    </section>
  )
}