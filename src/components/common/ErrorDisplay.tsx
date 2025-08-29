'use client'
import { memo } from 'react'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  className?: string
}

export const ErrorDisplay = memo(function ErrorDisplay({ error, onRetry, className = '' }: ErrorDisplayProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 text-center ${className}`}>
      <div className="text-4xl mb-4">❌</div>
      <p className="text-red-600 mb-4">Error: {error}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
})

export default ErrorDisplay