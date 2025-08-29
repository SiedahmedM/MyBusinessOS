'use client'
import { useState, useCallback } from 'react'
import { logger } from '@/lib/logger'

interface ProcessStep {
  number: number
  title: string
  duration: string
  activities: string[]
  deliverable: string
  icon: string
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Discovery & Design',
    duration: '3-5 days',
    icon: '◆',
    activities: [
      'Requirements gathering session',
      'Technical architecture planning', 
      'UI/UX design mockups',
      'Project timeline & milestones'
    ],
    deliverable: 'Complete project blueprint & timeline'
  },
  {
    number: 2,
    title: 'Development & Testing', 
    duration: '2-8 weeks',
    icon: '◆',
    activities: [
      'Agile development sprints',
      'Weekly progress demos',
      'Automated testing & QA',
      'Security & performance optimization'
    ],
    deliverable: 'Fully functional software ready for launch'
  },
  {
    number: 3,
    title: 'Launch & Training',
    duration: '1 week',
    icon: '◆',
    activities: [
      'Production deployment',
      'Team training sessions',
      'Data migration (if needed)',
      'Go-live support'
    ],
    deliverable: 'Live system with trained team'
  },
  {
    number: 4,
    title: 'Support & Growth',
    duration: 'Ongoing',
    icon: '◆',
    activities: [
      '30-day success guarantee',
      'Performance monitoring',
      'Feature updates & enhancements',
      'Strategic growth planning'
    ],
    deliverable: 'Continuous optimization & support'
  }
]

interface ProcessTimelineProps {
  className?: string
}

export function ProcessTimeline({ className = '' }: ProcessTimelineProps) {
  const [error, setError] = useState<string | null>(null)
  const [selectedStep, setSelectedStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleStepClick = useCallback((stepNumber: number) => {
    try {
      setError(null)
      logger.info('ProcessTimeline: Step selected', { stepNumber })
      setSelectedStep(stepNumber)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to select step'
      logger.error('ProcessTimeline: Step selection failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-2 border-accent-600 border-t-transparent rounded-full mr-3"></div>
        <span>Loading process steps...</span>
      </div>
    )
  }

  const selectedStepData = processSteps.find(step => step.number === selectedStep) || processSteps[0]

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            How We Work Together
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A proven 4-step process that delivers results every time. 
            From idea to live software in weeks, not months.
          </p>
        </div>

        {/* Process Steps Timeline */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-accent-500 transform -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step) => (
              <div 
                key={step.number}
                onClick={() => handleStepClick(step.number)}
                className={`cursor-pointer group ${
                  selectedStep === step.number ? 'scale-105' : 'hover:scale-102'
                } transition-all duration-300`}
              >
                {/* Step Circle */}
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 ${
                  selectedStep === step.number
                    ? 'bg-gradient-to-br from-primary-700 to-primary-500 text-white shadow-lg'
                    : 'bg-white border-4 border-gray-200 text-gray-400 group-hover:border-accent-300'
                }`}>
                  {step.number}
                </div>
                
                {/* Step Info */}
                <div className="text-center">
                  <h3 className={`text-lg font-bold mb-2 transition-colors ${
                    selectedStep === step.number ? 'text-accent-600' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium">
                    {step.duration}
                  </p>
                  <div className="text-2xl mt-2">{step.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Step Details */}
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Activities */}
            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">
                What Happens During {selectedStepData.title}
              </h4>
              <div className="space-y-4">
                {selectedStepData.activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Deliverable */}
            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">
                What You Get
              </h4>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{selectedStepData.icon}</div>
                  <div>
                    <div className="text-lg font-semibold text-accent-600 mb-2">
                      Key Deliverable
                    </div>
                    <p className="text-neutral-700 text-lg leading-relaxed">
                      {selectedStepData.deliverable}
                    </p>
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800">
                      <span className="w-2 h-2 bg-accent-400 rounded-full mr-2"></span>
                      Duration: {selectedStepData.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              What's Included in Every Project
            </h3>
            <p className="text-lg text-neutral-600">
              Everything you need for a successful software launch
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Planning & Design',
                icon: '◆',
                features: [
                  'Unlimited revisions on design',
                  'Technical architecture document',
                  'Project management portal access',
                  'Weekly progress calls'
                ]
              },
              {
                title: 'Development',
                icon: '◆',
                features: [
                  'Clean, maintainable code',
                  'Automated testing suite',
                  'Mobile-responsive design',
                  'Security best practices'
                ]
              },
              {
                title: 'Deployment',
                icon: '◆',
                features: [
                  'Production environment setup',
                  'SSL certificates & security',
                  'Monitoring & error tracking',
                  'Backup & recovery systems'
                ]
              },
              {
                title: 'Support',
                icon: '◆',
                features: [
                  '30-day success guarantee',
                  '6 months of updates included',
                  'Training documentation',
                  'Video tutorials for your team'
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">{category.icon}</div>
                <h4 className="text-lg font-bold text-neutral-900 mb-4">{category.title}</h4>
                <ul className="space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Success Guarantee */}
        <div className="mt-16 bg-primary-gradient rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-4">◆</div>
          <h3 className="text-2xl font-bold mb-4">30-Day Success Guarantee</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            I'm so confident in my process and results that I offer a 30-day success guarantee. 
            If you're not completely satisfied with your software, I'll work with you until you are - at no additional cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">◆</span>
              <span>Results-driven approach</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">◆</span>
              <span>Fast delivery guaranteed</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">◆</span>
              <span>Quality assurance included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline