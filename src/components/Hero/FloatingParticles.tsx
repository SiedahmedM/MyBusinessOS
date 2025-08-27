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
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          delay: Math.random() * 5, // 0-5 second delay
          duration: 6 + Math.random() * 4, // 6-10 second duration
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
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
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