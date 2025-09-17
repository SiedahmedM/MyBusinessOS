"use client"
import React from "react"

type Props = {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className = "" }: Props) {
  return (
    <div className={`relative rounded-2xl p-[1px] overflow-hidden glow-border ${className}`}>
      <div className="rounded-[14px] bg-black/60 border border-white/10 h-full w-full">
        {children}
      </div>
    </div>
  )
}

