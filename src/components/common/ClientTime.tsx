'use client'
import { useEffect, useState, useMemo } from 'react'

type Timestamp = number | string | Date

interface ClientTimeProps {
  timestamp: Timestamp
  className?: string
  locale?: string
  timeZone?: string
}

export function ClientTime({
  timestamp,
  className,
  locale = 'en-US',
  timeZone = 'America/Los_Angeles',
}: ClientTimeProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Normalize once; don't recompute the Date object on every render
  const date = useMemo(() => {
    if (timestamp instanceof Date) return timestamp
    if (typeof timestamp === 'number') return new Date(timestamp)
    // string: try to parse ISO or epoch-in-string
    const n = Number(timestamp)
    return Number.isFinite(n) ? new Date(n) : new Date(timestamp)
  }, [timestamp])

  // Render skeleton placeholder during SSR to avoid layout shift
  if (!mounted) return <span className={className} aria-hidden="true">&thinsp;</span>

  const formatted = new Intl.DateTimeFormat(locale, {
    timeStyle: 'medium',
    hour12: true,
    timeZone,
  }).format(date)

  return (
    <span className={className}>
      <time dateTime={date.toISOString()}>{formatted}</time>
    </span>
  )
}