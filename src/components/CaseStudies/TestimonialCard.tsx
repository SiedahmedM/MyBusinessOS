'use client'
import type { CaseStudy } from '@/types'

interface TestimonialCardProps {
  study: CaseStudy;
}

export function TestimonialCard({ study }: TestimonialCardProps) {
  console.log('TestimonialCard: Rendering for', study.business);

  return (
    <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-colors">
      {/* Header */}
      <div className="flex items-start mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
          {study.business.split(' ').map(word => word[0]).join('').slice(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{study.business}</h3>
          <p className="text-gray-400 mb-2">{study.industry}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
            <span className="text-gray-400 ml-2 text-sm">5.0 stars</span>
          </div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-white text-lg italic mb-6 leading-relaxed">
        "{study.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold mr-3">
          {study.author.split(' ').map(name => name[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-white">{study.author}</p>
          <p className="text-gray-400 text-sm">{study.position}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4 mb-8">
        <h4 className="text-lg font-semibold text-white">Key Results</h4>
        {study.metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
            <span className="text-gray-300">{metric.label}</span>
            <div className="text-right">
              <span className="text-white font-semibold">{metric.value}</span>
              <div className="text-green-400 text-sm">{metric.improvement}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Features Implemented</h4>
        <div className="space-y-2">
          {study.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}