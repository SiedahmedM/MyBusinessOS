'use client'
import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'
import Carousel from '@/components/ui/carousel'

interface Project {
  title?: string
  description?: string
  button?: string
  src: string
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
          title: 'Business Management Dashboard',
          description: 'Complete business management dashboard with real-time analytics, sales tracking, and team management.',
          button: 'View Details',
          src: '/images/business-dashboard.webp'
        },
        {
          title: 'Restaurant POS System',
          description: 'Restaurant point-of-sale system with online ordering and kitchen display integration.',
          button: 'View Details',
          src: '/api/placeholder/600/400'
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
    <section className="py-16" id="projects">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Projects</h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Real applications built for real businesses. See the quality and attention to detail in every project.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Carousel slides={projects} />
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