'use client'
import { useState, useCallback } from 'react'
import { TestimonialCard } from './TestimonialCard'
import type { CaseStudy } from '@/types'
import { logger } from '@/lib/logger'

const caseStudies: CaseStudy[] = [
  {
    id: 'adams-muffler',
    business: "Adam's Muffler Shop",
    industry: 'Auto Repair',
    profile_image: '/images/adams-muffler.jpg',
    quote: "MyBusinessOS transformed how we operate. We went from sticky notes and phone calls to a professional system that our customers love. The investment paid for itself in just 2 months!",
    author: "Adam Rodriguez",
    position: "Owner, Adam's Muffler Shop",
    rating: 5,
    metrics: [
      { label: 'Monthly Revenue', value: '$50,750', improvement: '+45% increase' },
      { label: 'Customer Satisfaction', value: '4.8/5 stars', improvement: '+60% improvement' },
      { label: 'Hours Saved/Week', value: '15 hours', improvement: 'Time back to family' },
      { label: 'Return on Investment', value: '380%', improvement: 'In first year' }
    ],
    features: [
      'Real-time repair tracking with photos',
      'Automated SMS customer updates',
      'Digital inspection reports',
      'Parts inventory management',
      'Customer history and preferences',
      'Online appointment scheduling'
    ]
  },
  {
    id: 'bellas-italian',
    business: "Bella's Italian Kitchen",
    industry: 'Restaurant',
    profile_image: '/images/bellas-italian.jpg',
    quote: "The online ordering system alone doubled our takeout business. The kitchen display system eliminated order mistakes. This wasn't an expense, it was the best investment we ever made.",
    author: "Isabella Martinez",
    position: "Owner, Bella's Italian Kitchen",
    rating: 5,
    metrics: [
      { label: 'Monthly Revenue', value: '$140,250', improvement: '+65% increase' },
      { label: 'Online Orders', value: '450/month', improvement: 'New revenue stream' },
      { label: 'Order Accuracy', value: '99.2%', improvement: 'Near perfect' },
      { label: 'Staff Efficiency', value: '35%', improvement: 'Time savings' }
    ],
    features: [
      'Custom online ordering system',
      'Kitchen display with timing',
      'Table reservation management',
      'Inventory tracking with suppliers',
      'Customer loyalty program',
      'Real-time sales analytics'
    ]
  },
  {
    id: 'premier-construction',
    business: "Premier Construction Co.",
    industry: 'Construction',
    profile_image: '/images/premier-construction.jpg',
    quote: "We went from chaos to complete control. Clients love the transparency, crews know exactly what to do, and we're winning more bids than ever. MyBusinessOS gave us enterprise capabilities at a fraction of the cost.",
    author: "Michael Chen",
    position: "CEO, Premier Construction Co.",
    rating: 5,
    metrics: [
      { label: 'Annual Revenue', value: '$2.8M', improvement: '+35% increase' },
      { label: 'Project Completion', value: '95%', improvement: 'On-time delivery' },
      { label: 'Bid Win Rate', value: '42%', improvement: '+68% improvement' },
      { label: 'Client Satisfaction', value: '4.7/5 stars', improvement: '+34% increase' }
    ],
    features: [
      'Project timeline management',
      'Client portal with progress photos',
      'Crew scheduling system',
      'Material tracking and ordering',
      'Automated bid generation',
      'Cost tracking and analysis'
    ]
  },
  {
    id: 'marketing-agency-saas',
    business: 'Digital Growth Partners',
    industry: 'Marketing Agency → SaaS',
    profile_image: '/images/digital-growth.jpg',
    quote: "We transformed from a traditional agency trading time for money to a scalable SaaS platform generating $75K monthly recurring revenue. Our profit margins went from 20% to 85%.",
    author: 'Sarah Johnson',
    position: 'CEO, Digital Growth Partners',
    rating: 5,
    metrics: [
      { label: 'Monthly Recurring Revenue', value: '$75,000', improvement: 'New revenue model' },
      { label: 'Client Capacity', value: '300+ clients', improvement: 'vs 10 before' },
      { label: 'Profit Margin', value: '85%', improvement: 'Up from 20%' },
      { label: 'Time Investment', value: '5 hours/week', improvement: 'vs 60 hours/week' }
    ],
    features: [
      'Self-service client dashboards',
      'Automated report generation',
      'White-label platform',
      'Subscription billing system',
      'Multi-tenant architecture',
      'API integrations with major platforms'
    ]
  },
  {
    id: 'ecommerce-platform',
    business: 'Artisan Crafts Collective',
    industry: 'E-commerce',
    profile_image: '/images/artisan-crafts.jpg',
    quote: "Our custom e-commerce platform outperforms Shopify by 60% in conversion rates. The inventory sync with our physical stores was a game-changer.",
    author: 'Maria Santos',
    position: 'Owner, Artisan Crafts Collective',
    rating: 5,
    metrics: [
      { label: 'Conversion Rate', value: '8.2%', improvement: '60% better than Shopify' },
      { label: 'Average Order Value', value: '$127', improvement: '+43% increase' },
      { label: 'Inventory Accuracy', value: '99.8%', improvement: 'Real-time sync' },
      { label: 'Customer Satisfaction', value: '4.9/5 stars', improvement: 'Exceptional rating' }
    ],
    features: [
      'Custom product configurator',
      'Real-time inventory sync',
      'Multiple payment gateways',
      'Advanced analytics dashboard',
      'Customer loyalty program',
      'Mobile-optimized checkout'
    ]
  },
  {
    id: 'mobile-app-fitness',
    business: 'FitLife Studios',
    industry: 'Mobile App (Fitness)',
    profile_image: '/images/fitlife-studios.jpg',
    quote: "The mobile app revolutionized our business. Members love the convenience and we've seen 80% more engagement. Our retention rate doubled!",
    author: 'David Kim',
    position: 'Owner, FitLife Studios',
    rating: 5,
    metrics: [
      { label: 'Member Engagement', value: '80%', improvement: 'Higher usage' },
      { label: 'Retention Rate', value: '92%', improvement: 'Doubled' },
      { label: 'Mobile Bookings', value: '95%', improvement: 'Almost all bookings' },
      { label: 'Revenue per Member', value: '$89/month', improvement: '+28% increase' }
    ],
    features: [
      'Native iOS/Android apps',
      'Class booking and waitlists',
      'Workout tracking',
      'Social features and challenges',
      'Push notifications',
      'Wearable device integration'
    ]
  }
]

export function CaseStudies() {
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = useCallback((category: string) => {
    try {
      setError(null)
      logger.info('CaseStudies: Category changed', { category })
      setSelectedCategory(category)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change category'
      logger.error('CaseStudies: Category change failed', { error: errorMessage })
      setError(errorMessage)
    }
  }, [])

  const filteredStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => {
        if (selectedCategory === 'business-management') return study.industry.includes('Auto') || study.industry.includes('Restaurant') || study.industry.includes('Construction')
        if (selectedCategory === 'agency-to-saas') return study.industry.includes('Marketing Agency')
        if (selectedCategory === 'ecommerce') return study.industry.includes('E-commerce')
        if (selectedCategory === 'mobile-app') return study.industry.includes('Mobile App')
        return false
      })

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
        <span>Loading case studies...</span>
      </div>
    )
  }

  logger.info('CaseStudies: Rendering component', { studiesCount: filteredStudies.length, selectedCategory })

  return (
    <section id="case-studies" className="section-padding bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white mb-6">
            Real Businesses, Real Results
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            See how I've helped businesses transform their operations 
            with custom software solutions. These are real clients with real results.
          </p>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'all', label: 'All Projects', count: caseStudies.length },
              { id: 'business-management', label: 'Business Systems', count: caseStudies.filter(s => s.industry.includes('Auto') || s.industry.includes('Restaurant') || s.industry.includes('Construction')).length },
              { id: 'agency-to-saas', label: 'Agency → SaaS', count: caseStudies.filter(s => s.industry.includes('Marketing Agency')).length },
              { id: 'ecommerce', label: 'E-commerce', count: caseStudies.filter(s => s.industry.includes('E-commerce')).length },
              { id: 'mobile-app', label: 'Mobile Apps', count: caseStudies.filter(s => s.industry.includes('Mobile App')).length }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-gradient text-white shadow-lg'
                    : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study */}
        {filteredStudies.length > 0 && (
          <div className="mb-16">
            <div className="bg-primary-gradient rounded-2xl p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4">
                    ◆ Featured Success Story
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{filteredStudies[0].business}</h3>
                  <p className="text-xl text-neutral-200 mb-6 leading-relaxed">
                    "{filteredStudies[0].quote}"
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      {filteredStudies[0].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{filteredStudies[0].author}</p>
                      <p className="text-neutral-300">{filteredStudies[0].position}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredStudies[0].metrics.slice(0, 2).map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold">{metric.value}</div>
                        <div className="text-neutral-300 text-sm">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">System Features</h4>
                    <div className="space-y-2 text-sm">
                      {filteredStudies[0].features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Case Studies */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredStudies.slice(1).map((study, index) => (
            <div key={study.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <TestimonialCard study={study} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-neutral-300 mb-8">
            Ready to join these successful businesses?
          </p>
          <button 
            onClick={() => document.getElementById('ai-playground')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 btn-primary mr-4"
          >
            Start Your Success Story
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg btn-hover focus-outline"
          >
            Get Your Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}