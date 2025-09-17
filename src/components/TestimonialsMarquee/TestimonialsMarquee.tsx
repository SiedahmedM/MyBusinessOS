'use client'
import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'

interface Testimonial {
  quote: string
  name: string
  title: string
}

export function TestimonialsMarquee({ embedded = false }: { embedded?: boolean }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      logger.info('TestimonialsMarquee: loading testimonials')
      setTestimonials([
        { quote: 'The team delivered ahead of schedule and exceeded expectations.', name: 'Sarah K.', title: 'COO, RetailCo' },
        { quote: 'Our new portal transformed how clients interact with us.', name: 'James P.', title: 'Founder, BuildIt' },
        { quote: 'Revenue jumped 40% after launch. Outstanding work!', name: 'Lena M.', title: 'CEO, FitLife' }
      ])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load testimonials'
      logger.error('TestimonialsMarquee: load failed', { error: errorMessage })
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
        <span>Loading testimonials...</span>
      </div>
    )
  }

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    embedded ? (
      <div className="relative pt-8 pb-4 overflow-hidden">{children}</div>
    ) : (
      <section className="relative py-16 bg-transparent overflow-hidden">{children}</section>
    )
  )

  return (
    <Wrapper>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">What Clients Say</h2>
      <div className="overflow-hidden">
        <div className="flex animate-marquee space-x-8">
          {testimonials.concat(testimonials).map((t, idx) => (
            <div key={idx} className="min-w-[300px] p-6">
              <p className="text-neutral-200 text-sm mb-4">"{t.quote}"</p>
              <div className="text-neutral-400 text-sm font-semibold">{t.name}</div>
              <div className="text-neutral-500 text-xs">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default TestimonialsMarquee
