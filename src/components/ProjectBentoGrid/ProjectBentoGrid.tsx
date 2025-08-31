'use client'
import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'
import Carousel from '@/components/ui/carousel'

interface Project {
  title?: string
  description?: string
  button?: string
  src: string
  focalX?: string // e.g. "50%" (default center)
  focalY?: string // e.g. "30%"
  zoom?: number
  offsetX?: string
  offsetY?: string
  aspectRatio?: string
}

export function ProjectBentoGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      logger.info('ProjectBentoGrid: loading projects')
      setProjects([
        {
          title: 'AI Business Assistant',
          description: 'An AI-powered business assistant featuring a 24/7 customer chatbot, automated document summarization with draft replies, and predictive analytics dashboards to forecast trends. Designed to streamline operations and boost customer satisfaction.',
          button: 'View Details',
          src: '/images/ai-business-assistant.webp',
          focalX: '50%',
          focalY: '50%',
          aspectRatio: '4/3'
        },
        {
          title: 'Business Management Dashboard',
          description: 'Complete business management dashboard with real-time analytics, sales tracking, and team management.',
          button: 'View Details',
          src: '/images/business-dashboard.webp',
          focalX: '50%',
          focalY: '45%'
        },
        {
          title: 'Workflow Automation System',
          description: 'Automated workflow management with task routing, approvals, and real-time status tracking.',
          button: 'View Details',
          src: '/images/workflow-automation.webp',
          focalX: '50%',
          focalY: '40%'
        },
        {
          title: 'Zillow iOS Listing Redesign',
          description: "Redesigned the home listing view for Zillow's iOS app to improve clarity and conversions.",
          button: 'View Details',
          src: '/images/mobile-app.webp',
          focalX: '50%',
          focalY: '50%',
          zoom: 1.25
        },
        {
          title: 'Construction Portal',
          description: 'Construction project portal for sharing updates, progress photos, and client communication.',
          button: 'View Details',
          src: '/api/placeholder/600/400'
        },
        {
          title: 'Fitness Mobile App',
          description: 'Mobile fitness app for booking classes, tracking workouts, and progress monitoring.',
          button: 'View Details',
          src: '/api/placeholder/300/600'
        }
      ])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load projects'
      logger.error('ProjectBentoGrid: load failed', { error: errorMessage })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Hide any projects that do not have a real image yet
  const visibleProjects = projects.filter((p) => !p.src.startsWith('/api/placeholder'))

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
        <p>Error: {error}</p>
        <button onClick={() => setError(null)} className="mt-2 underline text-sm">Try again</button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
        <span className="text-white">Loading projects...</span>
      </div>
    )
  }

  return (
    <section className="py-16 overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Recent Projects</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Real applications built for real businesses. See the quality and attention to detail in every project.
          </p>
        </div>
        
        <div className="w-full max-w-screen-xl mx-auto overflow-hidden px-4">
          <Carousel slides={visibleProjects} />
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-300 mb-4">
            Want to see your business with software like this?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-8 py-3"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectBentoGrid