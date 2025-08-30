'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo)
    // Log to external service in production
    this.logErrorToService(error, errorInfo)
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // Production error logging
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      console.log('Logging error to external service:', { error, errorInfo })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center">
            <h2 className="font-sans font-semibold tracking-tighter2 text-2xl text-neutral-900 mb-4">Something went wrong</h2>
            <p className="font-sans text-base md:text-lg text-neutral-600 tracking-tightish mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary font-sans font-medium tracking-tightish"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}