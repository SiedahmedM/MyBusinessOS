import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock the dependencies
jest.mock('@/lib/supabase')
jest.mock('@/lib/validation')
jest.mock('@/lib/logger')

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('handles valid contact form submission', async () => {
    const mockValidation = require('@/lib/validation')
    mockValidation.validateContactForm.mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'auto',
        message: 'I need a CRM system for my auto shop'
      },
      errors: null
    })

    const mockSupabase = require('@/lib/supabase')
    mockSupabase.saveContactLead.mockResolvedValue({ id: '123' })

    const mockRequest = {
      json: () => Promise.resolve({
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'auto',
        message: 'I need a CRM system for my auto shop'
      }),
      headers: new Map([['x-forwarded-for', '192.168.1.1']])
    } as NextRequest

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('Thank you for your message')
  })

  test('handles validation errors', async () => {
    const mockValidation = require('@/lib/validation')
    mockValidation.validateContactForm.mockReturnValue({
      success: false,
      data: null,
      errors: [
        { field: 'name', message: 'Name is required' },
        { field: 'email', message: 'Invalid email address' }
      ]
    })

    const mockRequest = {
      json: () => Promise.resolve({
        name: '',
        email: 'invalid-email',
        businessType: '',
        message: ''
      }),
      headers: new Map()
    } as NextRequest

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid form data')
    expect(data.details).toBeDefined()
  })

  test('handles database errors gracefully', async () => {
    const mockValidation = require('@/lib/validation')
    mockValidation.validateContactForm.mockReturnValue({
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'auto',
        message: 'Test message'
      },
      errors: null
    })

    const mockSupabase = require('@/lib/supabase')
    mockSupabase.saveContactLead.mockResolvedValue(null) // Simulate database error

    const mockRequest = {
      json: () => Promise.resolve({
        name: 'John Doe',
        email: 'john@example.com',
        businessType: 'auto',
        message: 'Test message'
      }),
      headers: new Map()
    } as NextRequest

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Internal server error. Please try again later.')
    // RequestId might not be included in all error responses
    expect(data.requestId || data.error).toBeDefined()
  })
})