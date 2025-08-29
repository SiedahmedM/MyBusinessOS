'use client'
import { TypingAnimation } from './TypingAnimation'
import { CounterStats } from './CounterStats'
import { FloatingParticles } from './FloatingParticles'
import { LogoGrid, Logo } from '@/components/common/Logo'
import { scrollToSection } from '@/lib/utils'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient section-fade-bottom section-fade-bottom--white">
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
        <h1 className="tech-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
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
            onClick={handleViewProjectsClick}
            className="btn-text w-full sm:w-auto text-base sm:text-lg"
            aria-label="View examples of completed projects"
          >
            View Examples
          </button>
        </div>
        
        {/* Stats - Simplified on mobile */}
        <div className="mt-8 sm:mt-12">
          <CounterStats />
        </div>
        
        {/* Branded Showcase - Positioned elegantly */}
        <div className="mt-12 sm:mt-16">
          <LogoGrid className="max-w-2xl mx-auto">
            <div className="logo-showcase">
              <div className="flex-shrink-0">
                <Logo variant="hero" size="lg" />
              </div>
              <div className="text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                  CustomSoftwarePro
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Transforming businesses through custom software development. 
                  From concept to deployment in weeks, not months.
                </p>
                <div className="flex items-center mt-3 text-xs sm:text-sm text-accent-600 font-medium">
                  <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                  Enterprise-grade solutions at freelancer prices
                </div>
              </div>
            </div>
          </LogoGrid>
        </div>
      </div>
    </section>
  )
}