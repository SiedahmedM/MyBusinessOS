import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  businessType: z.string().min(1, 'Business type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000)
})

const demoRequestSchema = z.object({
  sessionId: z.string().min(1),
  businessType: z.enum(['dental', 'auto', 'restaurant', 'medical']),
  description: z.string().min(5, 'Description must be at least 5 characters').max(500)
})

export function validateContactForm(data: any) {
  try {
    const validData = contactFormSchema.parse(data)
    return { success: true, data: validData, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
      }
    }
    return { success: false, data: null, errors: [{ field: 'unknown', message: 'Validation failed' }] }
  }
}

export function validateDemoRequest(data: any) {
  try {
    const validData = demoRequestSchema.parse(data)
    return { success: true, data: validData, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
      }
    }
    return { success: false, data: null, errors: [{ field: 'unknown', message: 'Validation failed' }] }
  }
}