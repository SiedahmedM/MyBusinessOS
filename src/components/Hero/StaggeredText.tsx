'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StaggeredTextProps {
  lines: Array<{
    text: string
    className?: string
  }>
  className?: string
}

export function StaggeredText({ lines, className = '' }: StaggeredTextProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)


  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    
    // Check reduced motion preference
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkMobile()
    checkReducedMotion()
    
    window.addEventListener('resize', checkMobile)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [])

  // Animation configuration based on device and preferences
  const getAnimationConfig = () => {
    if (prefersReducedMotion) {
      return {
        duration: 0,
        staggerDelay: 0,
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 }
      }
    }
    
    return {
      duration: isMobile ? 0.2 : 0.4,  // Original subtle timing
      staggerDelay: isMobile ? 0.08 : 0.1,  // Original subtle stagger
      initial: { opacity: 0, y: 20 },  // Original subtle movement
      animate: { opacity: 1, y: 0 }
    }
  }

  const config = getAnimationConfig()

  // Container variants for orchestrating the animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: 0.1  // Subtle initial delay
      }
    }
  }

  // Line variants for line-level control
  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: 0
      }
    }
  }

  // Word variants for individual word animations
  const wordVariants = {
    hidden: config.initial,
    visible: {
      ...config.animate,
      transition: {
        duration: config.duration,
        ease: 'easeOut'
      }
    }
  }


  // Calculate total words in first line for second line delay
  const firstLineWordCount = lines[0]?.text.split(' ').length || 0
  const secondLineDelay = firstLineWordCount * config.staggerDelay * 0.3 // Second line starts partway through first line

  // Split text into words and create animated spans
  const renderAnimatedLine = (lineText: string, lineIndex: number) => {
    const words = lineText.split(' ')
    
    return words.map((word, wordIndex) => (
      <motion.span
        key={`${lineIndex}-${wordIndex}`}
        variants={wordVariants}
        className="inline-block"
        style={{ marginRight: wordIndex === words.length - 1 ? 0 : '0.25em' }}
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <motion.h1 
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className={`block ${line.className || ''}`}
          variants={lineVariants}
          style={{ 
            // Add delay for second line
            transitionDelay: index > 0 ? `${secondLineDelay}s` : '0s' 
          }}
        >
          {renderAnimatedLine(line.text, index)}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// Alternative component for simpler single-line text
interface SimpleStaggeredTextProps {
  text: string
  className?: string
}

export function SimpleStaggeredText({ text, className = '' }: SimpleStaggeredTextProps) {
  return (
    <StaggeredText 
      lines={[{ text, className }]} 
      className={className}
    />
  )
}