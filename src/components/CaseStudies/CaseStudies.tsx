'use client'
import { TestimonialCard } from './TestimonialCard'
import type { CaseStudy } from '@/types'

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
  }
]

export function CaseStudies() {
  console.log('CaseStudies: Rendering component with', caseStudies.length, 'studies');

  return (
    <section id="case-studies" className="section-padding bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white mb-6">
            Real Businesses, Real Results
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how I've helped Orange County businesses transform their operations 
            with custom software solutions. These are real clients with real results.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {/* Primary Case Study - Adam's Muffler Shop */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4">
                    ⭐ Featured Success Story
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Adam's Muffler Shop</h3>
                  <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                    "MyBusinessOS transformed how we operate. We went from sticky notes and phone calls to a professional system that our customers love."
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      AR
                    </div>
                    <div>
                      <p className="font-semibold">Adam Rodriguez</p>
                      <p className="text-blue-200">Owner & Operator</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">45%</div>
                      <div className="text-blue-200 text-sm">Revenue Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">380%</div>
                      <div className="text-blue-200 text-sm">ROI First Year</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">System Features</h4>
                    <div className="space-y-2 text-sm">
                      {caseStudies[0].features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Case Studies */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.slice(1).map((study, index) => (
            <div key={study.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <TestimonialCard study={study} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-8">
            Ready to join these successful businesses?
          </p>
          <button 
            onClick={() => document.getElementById('ai-playground')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg btn-hover focus-outline mr-4"
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