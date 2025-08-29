'use client'
import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsRevealed(true)
              setHasTriggered(true)
            }, delay)
          } else {
            setIsRevealed(true)
            setHasTriggered(true)
          }
          
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsRevealed(false)
        }
      },
      { 
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { ref, isRevealed }
}

export function useStaggeredReveal(itemCount: number, staggerDelay = 100) {
  const [revealedItems, setRevealedItems] = useState<boolean[]>(new Array(itemCount).fill(false))
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element || hasTriggered) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true)
          
          // Stagger the reveal of items
          const newRevealedItems = new Array(itemCount).fill(false)
          
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setRevealedItems(prev => {
                const updated = [...prev]
                updated[i] = true
                return updated
              })
            }, i * staggerDelay)
          }
          
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [itemCount, staggerDelay, hasTriggered])

  return { containerRef, revealedItems }
}