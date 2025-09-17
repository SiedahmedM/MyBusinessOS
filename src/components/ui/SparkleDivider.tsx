"use client"
import React from "react"

export function SparkleDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center my-8 ${className}`}>
      <span className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
      <span className="mx-2 w-2.5 h-2.5 rounded-full bg-accent-500 shadow-[0_0_0_4px_rgba(255,213,46,.18)] animate-pulse"/>
      <span className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
    </div>
  )
}

