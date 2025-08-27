'use client'
import { TypingAnimation } from './TypingAnimation'
import { CounterStats } from './CounterStats'
import { FloatingParticles } from './FloatingParticles'
import { scrollToSection } from '@/lib/utils'

export function Hero() {
  console.log('Hero: Rendering component');

  const handleScrollToAI = () => {
    console.log('Hero: Scrolling to AI playground');
    scrollToSection('ai-playground');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full glass-hero-stats mb-8">
          <span className="text-gray-900 font-medium">
            Expert Developer • Orange County
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="hero-title text-white mb-8">
          I Build Software That
          <br />
          <span className="text-yellow-300">Transforms Businesses</span>
        </h1>
        
        {/* Typing Animation */}
        <TypingAnimation />
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleScrollToAI}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg btn-hover focus-outline"
          >
            See My Work In Action
          </button>
          <button
            onClick={() => scrollToSection('case-studies')}
            className="px-8 py-4 glass-hero-stats text-gray-900 font-bold rounded-lg btn-hover focus-outline"
          >
            View Success Stories
          </button>
        </div>
        
        {/* Stats */}
        <CounterStats />
      </div>
    </section>
  )
}