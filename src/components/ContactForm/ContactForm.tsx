'use client'
import { useState } from 'react'
import { logger } from '@/lib/logger'
import { toast } from 'sonner'

import { StarsBackground } from '@/components/ui/stars-background'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  

  console.log('ContactForm: Rendering component');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Please select your business type'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      logger.warn('ContactForm: Validation failed', { errors })
      return
    }

    setIsSubmitting(true)
    
    try {
      logger.info('ContactForm: Submitting form', { formData })
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      logger.info('ContactForm: Form submitted successfully')
      toast.success('Thank you for your message! I\'ll be in touch within 24 hours.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        businessType: '',
        message: ''
      })

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      logger.error('ContactForm: Submission failed', { error: errorMessage })
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative section-padding bg-neutral-50">
      {/* Stars for full-dark theme */}
      { (
        <StarsBackground starDensity={0.00005} className="opacity-30" />
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-neutral-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="font-sans text-lg text-neutral-600 tracking-tightish max-w-2xl mx-auto">
            Tell us about your business and we'll create a custom software solution
            that drives growth and saves you time.
          </p>
          <p className="mt-4 text-sm text-neutral-600 max-w-2xl mx-auto">
            Every message includes a free 15-minute consultation. Located in Orange County? I'm happy to meet in person for the consult.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Smith"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@yourbusiness.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-neutral-700 mb-2">
                Business Type *
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors ${
                  errors.businessType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your business type</option>
                <option value="auto">Auto Repair Shop</option>
                <option value="dental">Dental Practice</option>
                <option value="medical">Medical Practice</option>
                <option value="restaurant">Restaurant</option>
                <option value="construction">Construction</option>
                <option value="retail">Retail Store</option>
                <option value="professional">Professional Services</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Tell us about your business and what you need *
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="I run a [type] business and need help with [specific challenge]. We currently handle [process] manually and it's taking [time/causing issues]..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
              <p className="mt-2 text-sm text-neutral-500">
                The more details you provide, the better we can help you.
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message & Get Free 15-Minute Consultation'
                )}
              </button>

              <p className="mt-4 text-sm text-neutral-500">
                We typically respond within 2-4 hours during business hours. If you're in Orange County, ask about a free in-person 15-minute consultation.
              </p>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Prefer to call? We are always happy to chat about your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center">
              <span className="text-accent-600 mr-2">◆</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-accent-600 mr-2">◆</span>
              <span className="font-semibold">contact@customsoftwarepro.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}