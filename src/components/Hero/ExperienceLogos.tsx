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
    <div className="max-w-6xl mx-auto">
      <p className="text-center text-zinc-400 text-sm mb-6">
        Our engineers have shipped solutions for startups and global tech leaders.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center">
        {logos.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={80}
            unoptimized
            className="h-14 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300 ease-out"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
