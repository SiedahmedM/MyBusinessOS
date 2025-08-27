'use client'
import { useState, useEffect } from 'react'

export function TypingAnimation() {
  const texts = [
    "Enterprise-level solutions at freelancer prices",
    "Real-time systems that scale with your business", 
    "Mobile-first applications your customers will love",
    "Custom automation that eliminates manual work"
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    console.log('TypingAnimation: Current state', { currentIndex, currentText, isDeleting, isComplete });
    
    const targetText = texts[currentIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetText) {
        console.log('TypingAnimation: Text complete, waiting...');
        setIsComplete(true)
        setTimeout(() => {
          setIsDeleting(true)
          setIsComplete(false)
        }, 2000) // Wait 2 seconds before deleting
        return
      }
      
      if (isDeleting && currentText === '') {
        console.log('TypingAnimation: Deletion complete, moving to next');
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        return
      }
      
      if (isDeleting) {
        setCurrentText(currentText.slice(0, -1))
      } else {
        setCurrentText(targetText.slice(0, currentText.length + 1))
      }
    }, isDeleting ? 50 : 80) // Faster deletion, slower typing
    
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, isComplete])

  return (
    <div className="text-xl md:text-2xl text-white/90 mb-12 h-16 flex items-center justify-center">
      <span className="text-center max-w-4xl">
        {currentText}
        <span className="border-r-2 border-white animate-pulse ml-1 inline-block">|</span>
      </span>
    </div>
  )
}