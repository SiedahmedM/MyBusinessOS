'use client'
import { Component, ReactNode } from 'react'
import { ErrorDisplay } from './ErrorDisplay'
import { logger } from '@/lib/logger'

interface Props {
  children: ReactNode
  tabName: string
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: string | null
}

export class TabErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error.message
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    logger.error(`TabErrorBoundary: Error in ${this.props.tabName} tab`, {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      tabName: this.props.tabName
    })
  }

  handleRetry = () => {
    logger.info(`TabErrorBoundary: Retrying ${this.props.tabName} tab`)
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <ErrorDisplay
            error={`Failed to load ${this.props.tabName} content: ${this.state.error}`}
            onRetry={this.handleRetry}
            className="max-w-md"
          />
        </div>
      )
    }

    return this.props.children
  }
}