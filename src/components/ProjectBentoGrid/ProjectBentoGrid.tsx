'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { logger } from '@/lib/logger'

interface Project {
  id: string
  title: string
  description: string
  image: string
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
          id: 'crm',
          title: "Auto Shop CRM",
          description: 'Manage jobs, customers and invoices with ease.',
          image: '/api/placeholder/600/400'
        },
        {
          id: 'pos',
          title: 'Restaurant POS',
          description: 'Online ordering with kitchen display integration.',
          image: '/api/placeholder/600/400'
        },
        {
          id: 'portal',
          title: 'Construction Portal',
          description: 'Share project updates and progress photos.',
          image: '/api/placeholder/600/400'
        },
        {
          id: 'fitness',
          title: 'Fitness App',
          description: 'Book classes and track workouts on mobile.',
          image: '/api/placeholder/300/600'
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
        <span>Loading projects...</span>
      </div>
    )
  }

  return (
    <section className="py-16" id="projects">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Project Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center transition-all duration-300 hover:shadow-xl ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-200">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectBentoGrid

