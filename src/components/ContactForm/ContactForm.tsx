'use client'
import { useState } from 'react'
import { logger } from '@/lib/logger'
import { toast } from 'sonner'


export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    // Optional phone validation if provided
    if (formData.phone && formData.phone.trim()) {
      const phone = formData.phone.trim()
      const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/
      if (!phoneRegex.test(phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
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
        phone: '',
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
    <section id={compact ? undefined : 'contact'} className={compact ? '' : 'relative section-padding bg-black'}>

      <div className={compact ? '' : 'relative z-10 max-w-5xl mx-auto'}>
        {/* Header */}
        {!compact && (
          <div className="text-center mb-10">
            <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white mb-3">
              Ready to Transform Your Business?
            </h2>
            <p className="font-sans text-base md:text-lg text-white/70 tracking-tightish max-w-2xl mx-auto">
              Tell us about your business and we'll create a custom software solution that drives growth and saves you time.
            </p>
            <p className="mt-3 text-xs text-white/60 max-w-2xl mx-auto">
              Every message includes a free 15-minute consultation. Located in Orange County? We're happy to meet in person for the consultation.
            </p>
          </div>
        )}

        {/* Contact Form */}
        <div className={compact ? '' : 'rounded-2xl border-0 bg-transparent shadow-none p-6 md:p-8'}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="John Smith"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="john@yourbusiness.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Prefer to receive a call? <span className="text-white/40">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.phone ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="(555) 123-4567"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
              <p className="mt-2 text-xs text-white/50">Add your number and we’ll give you a quick call.</p>
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-white/80 mb-2">
                Business Type *
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                  errors.businessType ? 'border-red-500' : 'border-white/10'
                }`}
              >
                <option value="" className="bg-black">Select your business type</option>
                <option value="auto" className="bg-black">Auto Repair Shop</option>
                <option value="dental" className="bg-black">Dental Practice</option>
                <option value="medical" className="bg-black">Medical Practice</option>
                <option value="restaurant" className="bg-black">Restaurant</option>
                <option value="construction" className="bg-black">Construction</option>
                <option value="retail" className="bg-black">Retail Store</option>
                <option value="professional" className="bg-black">Professional Services</option>
                <option value="other" className="bg-black">Other</option>
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-400">{errors.businessType}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Tell us about your business and what you need *
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none ${
                  errors.message ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="I run a [type] business and need help with [specific challenge]..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
              <p className="mt-2 text-xs text-white/50">The more details you provide, the better we can help you.</p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-500 text-black font-semibold shadow-lg shadow-black/30 hover:bg-accent-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message & Get Free 15-Minute Consultation'
                )}
              </button>

              <p className="mt-3 text-xs text-white/60">We typically respond within 2–4 hours during business hours.</p>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-10">
          <p className="text-white/70 mb-2">Prefer to call? We are always happy to chat about your project.</p>
          <a href="mailto:contact@customsoftwarepro.com" className="font-semibold text-accent-300 hover:text-accent-200">contact@customsoftwarepro.com</a>
        </div>
      </div>
    </section>
  )
}
