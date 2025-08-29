'use client'
import { useEffect, useState } from 'react'

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    console.log('FloatingParticles: Generating particles');
    
    const generateParticles = () => {
      const newParticles: Particle[] = []
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          delay: Math.random() * 8, // 0-8 second delay  
          duration: 12 + Math.random() * 6, // 12-18 second duration (slower)
        })
      }
      
      setParticles(newParticles)
      console.log('FloatingParticles: Generated', newParticles.length, 'particles');
    }

    generateParticles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/15 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}