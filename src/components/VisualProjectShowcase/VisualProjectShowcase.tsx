'use client'
import { useState, useCallback } from 'react'
import { logger } from '@/lib/logger'

import { StarsBackground } from '@/components/ui/stars-background'

interface ProjectShowcase {
  id: string
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  results: string
  challenge: string
  solution: string
}

const projectShowcases: ProjectShowcase[] = [
  {
    id: 'muffler-shop-crm',
    title: "Adam's Auto CRM",
    category: 'Business Management',
    description: 'Complete auto shop management system with real-time repair tracking and customer notifications',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Next.js', 'Supabase', 'SMS API'],
    results: '+45% revenue, 15 hours saved/week',
    challenge: 'Manual processes, lost customer data, inefficient communication',
    solution: 'Custom-built CRM with real-time features, automated workflows, and mobile optimization'
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant POS System',
    category: 'E-commerce',
    description: 'Online ordering system with kitchen displays and real-time analytics',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Payment APIs', 'Real-time DB', 'Analytics'],
    results: '+65% revenue, 99.2% order accuracy',
    challenge: 'Limited online presence, order management chaos, no analytics',
    solution: 'Integrated POS system with online ordering, kitchen displays, and comprehensive analytics'
  },
  {
    id: 'construction-portal',
    title: 'Construction Client Portal',
    category: 'Project Management',
    description: 'Client portal with progress photos, timeline tracking, and automated billing',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'File Upload', 'Automated Reports', 'Billing Integration'],
    results: '+35% annual revenue, 95% on-time delivery',
    challenge: 'Poor client communication, manual reporting, project delays',
    solution: 'Comprehensive client portal with real-time updates, photo sharing, and automated reporting'
  },
  {
    id: 'fitness-mobile-app',
    title: 'FitLife Mobile App',
    category: 'Mobile App',
    description: 'Native iOS/Android app with class booking, workout tracking, and social features',
    image: '/api/placeholder/300/600',
    technologies: ['React Native', 'Push Notifications', 'Wearables', 'Social Features'],
    results: '+80% engagement, 92% retention rate',
    challenge: 'No mobile presence, limited customer engagement, manual processes',
    solution: 'Native mobile app with comprehensive features and seamless user experience'
  },
  {
    id: 'saas-dashboard',
    title: 'Marketing SaaS Platform',
    category: 'SaaS Platform',
    description: 'White-label platform with client dashboards and automated report generation',
    image: '/api/placeholder/600/400',
    technologies: ['Multi-tenant', 'API Integrations', 'Billing', 'White-label'],
    results: '$75K monthly recurring revenue',
    challenge: 'Service-based model limiting scalability and recurring revenue',
    solution: 'Scalable SaaS platform with white-label capabilities and automated billing'
  }
]

const categoryIcons = {
  'Business Management': '◆',
  'E-commerce': '◆',
  'Project Management': '◆',
  'Mobile App': '◆',
  'SaaS Platform': '◆'
}

export function VisualProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  

  const handleImageError = useCallback((projectId: string) => {
    try {
      logger.info('VisualProjectShowcase: Image load error', { projectId })
      setImageLoadErrors(prev => new Set(prev).add(projectId))
    } catch (err) {
      logger.error('VisualProjectShowcase: Error handling image error', { err })
    }
  }, [])

  const handleProjectClick = useCallback((projectId: string) => {
    try {
      logger.info('VisualProjectShowcase: Project clicked', { projectId })
      setSelectedProject(selectedProject === projectId ? null : projectId)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle project'
      logger.error('VisualProjectShowcase: Project click failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [selectedProject])

  const handleScrollToSection = useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        logger.info('VisualProjectShowcase: Scrolled to section', { sectionId })
      }
    } catch (err) {
      logger.error('VisualProjectShowcase: Scroll failed', { err, sectionId })
    }
  }, [])

  if (error) {
    return (
      <section className="py-16 bg-neutral-900">
        <div className="mobile-content-padding">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-16 bg-neutral-900 project-showcase section-fade-top section-fade-top--white section-fade-bottom section-fade-bottom--white">
      {/* Stars for full-dark theme */}
      { (
        <StarsBackground starDensity={0.00005} className="opacity-30" />
      )}
      
      <div className="relative z-10 mobile-content-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Project Showcase
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Real projects that transformed businesses. Each solution custom-built to solve specific challenges.
          </p>
        </div>

        {/* Project Grid - Mobile First */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {projectShowcases.map((project, index) => (
            <div 
              key={project.id}
              className={`group cursor-pointer transition-all duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              onClick={() => handleProjectClick(project.id)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleProjectClick(project.id)
                }
              }}
            >
              {/* Mobile: Stack vertically, Desktop: Side by side */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  {/* Project Image/Preview */}
                  <div className="relative lg:w-1/2">
                    <div className="aspect-video lg:aspect-square bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                      {!imageLoadErrors.has(project.id) ? (
                        <img
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(project.id)}
                          loading="lazy"
                        />
                      ) : (
                        /* Fallback design when image fails */
                        <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-500 flex flex-col items-center justify-center text-white p-8">
                          <div className="text-4xl mb-4">
                            {categoryIcons[project.category as keyof typeof categoryIcons] || '◆'}
                          </div>
                          <div className="text-xl font-bold text-center">{project.title}</div>
                          <div className="text-sm text-accent-200 mt-2 text-center">{project.category}</div>
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white text-neutral-900 px-6 py-2 rounded-full font-semibold pointer-events-none">
                          {selectedProject === project.id ? 'Hide Details' : 'View Details'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6 lg:w-1/2 lg:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-accent-500/20 text-accent-300 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Results */}
                    <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-3 mb-4">
                      <div className="text-accent-400 font-semibold text-sm mb-1">Results Achieved:</div>
                      <div className="text-accent-300 text-sm">{project.results}</div>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-white/10 text-neutral-400 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {selectedProject === project.id && (
                  <div className="border-t border-white/10 p-6 bg-white/5 animate-slideIn">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Challenge</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-3">Solution</h4>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-gradient rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to See Your Project Here?
            </h3>
            <p className="text-neutral-200 mb-6 max-w-2xl mx-auto leading-relaxed">
              Every project is custom-built to solve your specific challenges and deliver measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button
                onClick={() => handleScrollToSection('ai-playground')}
                className="btn-secondary w-full sm:w-auto"
                aria-label="Start your project with AI chat"
              >
                Start Your Project
              </button>
              <button
                onClick={() => handleScrollToSection('contact')}
                className="w-full sm:w-auto btn-primary"
                aria-label="Get a free quote for your project"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisualProjectShowcase