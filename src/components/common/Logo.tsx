'use client'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'header' | 'hero' | 'footer' | 'inline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
  color?: 'default' | 'white' | 'dark'
}

export function Logo({ 
  variant = 'header', 
  size = 'md', 
  className = '',
  showText = true,
  color = 'default'
}: LogoProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return showText ? 'h-6 w-auto' : 'h-6 w-6'
      case 'sm': return showText ? 'h-8 w-auto' : 'h-8 w-8'
      case 'md': return showText ? 'h-10 w-auto' : 'h-10 w-10'
      case 'lg': return showText ? 'h-12 w-auto' : 'h-12 w-12'
      case 'xl': return showText ? 'h-16 w-auto' : 'h-16 w-16'
      default: return showText ? 'h-10 w-auto' : 'h-10 w-10'
    }
  }

  const getContainerClasses = () => {
    const baseClasses = 'flex items-center transition-all duration-300'
    
    switch (variant) {
      case 'header':
        return cn(baseClasses, 'hover:scale-105 cursor-pointer')
      case 'hero':
        return cn(baseClasses, 'justify-center')
      case 'footer':
        return cn(baseClasses, 'opacity-90 hover:opacity-100')
      case 'inline':
        return cn(baseClasses, 'inline-flex')
      default:
        return baseClasses
    }
  }

  const getImageFilter = () => 'none'

  return (
    <div className={cn(getContainerClasses(), className)}>
      <div className="relative">
        <Image
          src={'/images/customsoftwarepro-logo.svg'}
          alt="CustomSoftwarePro - Custom Software Development"
          width={200}
          height={60}
          className={cn(
            getSizeClasses(),
            'rounded-lg transition-all duration-300',
            variant === 'header' && 'mix-blend-screen hover:opacity-90'
          )}
          style={{ filter: getImageFilter() }}
          priority={variant === 'header' || variant === 'hero'}
          unoptimized
        />
        
        {/* Subtle glow effect for hero variant */}
        {variant === 'hero' && (
          <div className="absolute inset-0 bg-accent-400/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        )}
      </div>
    </div>
  )
}

interface LogoGridProps {
  className?: string
  children?: React.ReactNode
}

export function LogoGrid({ className = '', children }: LogoGridProps) {
  return (
    <div className={cn(
      'relative overflow-hidden',
      // Custom grid background that complements the logo
      'bg-gradient-to-br from-neutral-50 via-white to-accent-50/30',
      'border border-neutral-200/50',
      'rounded-xl p-6',
      'shadow-lg shadow-neutral-900/5',
      // Subtle pattern overlay
      'before:absolute before:inset-0',
      'before:bg-grid-pattern before:opacity-[0.02]',
      'before:pointer-events-none',
      className
    )}>
      {/* Accent corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-400/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-tr-full" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface BrandedHeaderProps {
  className?: string
  children?: React.ReactNode
}

export function BrandedHeader({ className = '', children }: BrandedHeaderProps) {
  return (
    <div className={cn(
      'flex items-center justify-between',
      'bg-white/95 backdrop-blur-sm',
      'border-b border-neutral-200/60',
      'sticky top-0 z-50',
      'px-4 sm:px-6 lg:px-8',
      'h-16 sm:h-20',
      'transition-all duration-300',
      className
    )}>
      <Logo variant="header" size="md" />
      {children}
    </div>
  )
}
