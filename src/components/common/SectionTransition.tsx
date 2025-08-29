'use client'

interface SectionTransitionProps {
  from: 'dark' | 'light' | 'hero'
  to: 'dark' | 'light'
  children: React.ReactNode
  className?: string
  height?: 'sm' | 'md' | 'lg'
}

export function SectionTransition({ 
  from, 
  to, 
  children, 
  className = '',
  height = 'md'
}: SectionTransitionProps) {
  
  const getGradientClass = () => {
    if (from === 'hero' && to === 'light') {
      return 'bg-gradient-to-b from-black via-neutral-700 to-white'
    }
    if (from === 'light' && to === 'dark') {
      return 'bg-gradient-to-b from-white via-neutral-400 to-neutral-900'
    }
    if (from === 'dark' && to === 'light') {
      return 'bg-gradient-to-b from-neutral-900 via-neutral-600 to-white'
    }
    return 'bg-gradient-to-b from-white via-neutral-400 to-neutral-900'
  }

  const getHeightClass = () => {
    switch (height) {
      case 'sm': return 'h-32'
      case 'lg': return 'h-96'
      default: return 'h-48'
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Gradient transition overlay */}
      <div className={`absolute inset-x-0 top-0 ${getHeightClass()} ${getGradientClass()} opacity-60 pointer-events-none z-10`} />
      
      {/* Content with proper z-index */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}

interface BlendTransitionProps {
  children: React.ReactNode
  direction: 'up' | 'down'
  color: 'white' | 'black' | 'neutral'
  intensity?: number
  className?: string
}

export function BlendTransition({ 
  children, 
  direction, 
  color, 
  intensity = 100,
  className = '' 
}: BlendTransitionProps) {
  
  const getColorValue = () => {
    switch (color) {
      case 'white': return '#ffffff'
      case 'black': return '#000000'
      case 'neutral': return '#f5f5f5'
      default: return '#ffffff'
    }
  }

  const getGradientDirection = () => {
    return direction === 'up' ? 'to top' : 'to bottom'
  }

  const gradientStyle = {
    background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${getColorValue()} ${intensity}%)`
  }

  return (
    <div className={`relative ${className}`}>
      {/* Blend overlay */}
      <div 
        className={`absolute ${direction === 'up' ? 'bottom-0' : 'top-0'} left-0 right-0 h-32 pointer-events-none z-10`}
        style={gradientStyle}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}