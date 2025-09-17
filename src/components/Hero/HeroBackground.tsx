'use client'
import { StarsBackground } from '@/components/ui/stars-background'
import { ShootingStars } from '@/components/ui/shooting-stars'

export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-950" />
      <StarsBackground starDensity={0.00015} mobileTuning />
      <ShootingStars
        minDelay={2000}
        maxDelay={5000}
        starColor="#FFD52E"
        trailColor="#FFD52E"
      />
    </>
  )
}
