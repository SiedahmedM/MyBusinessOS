'use client'
// No starry background on Home hero per request

export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-950" />
    </>
  )
}
