'use client'
import { useState, useEffect, useRef } from 'react'

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: '20', label: 'Lower Cost', suffix: '%' },
  { value: '50', label: 'Faster Delivery', suffix: '%' },
  { value: '100', label: 'On-Time Rate', suffix: '%' },
  { value: '650', label: 'Average ROI', suffix: '%' }
]

function AnimatedCounter({ 
  target, 
  prefix = '', 
  suffix = '', 
  duration = 2000 
}: { 
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          console.log('AnimatedCounter: Starting animation for', target);
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible, target])

  useEffect(() => {
    if (!isVisible) return

    console.log('AnimatedCounter: Animating to', target);
    let startTime: number | null = null
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * target)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-gray-900">
      {prefix}{count}{suffix}
    </div>
  )
}

export function CounterStats() {
  console.log('CounterStats: Rendering component');
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="glass-hero-stats rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
        >
          <AnimatedCounter
            target={parseInt(stat.value)}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
          <div className="text-gray-600 text-sm mt-2 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}