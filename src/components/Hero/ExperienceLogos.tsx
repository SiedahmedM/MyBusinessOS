'use client'
import Image from 'next/image'
import {
  microsoftLogo,
  zillowLogo,
  accentureLogo,
  realtorLogo,
} from '@/data/partnerLogos'

interface Logo {
  src: string
  alt: string
}

const logos: Logo[] = [
  { src: microsoftLogo, alt: 'Microsoft' },
  { src: zillowLogo, alt: 'Zillow' },
  { src: accentureLogo, alt: 'Accenture' },
  { src: realtorLogo, alt: 'Realtor.com' },
]

export function ExperienceLogos() {
  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-center text-zinc-400 text-sm mb-6">
        Our engineers have shipped solutions for startups and global tech leaders.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="glass-hero-stats rounded-2xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              unoptimized
              className="h-12 w-auto object-contain opacity-80 saturate-150 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
