import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/ContactForm/ContactForm'

// Mock the fetch function
global.fetch = jest.fn()

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form heading and description', () => {
    render(<ContactForm />)
    expect(screen.getByText("Let's Build Something Amazing Together")).toBeInTheDocument()
    expect(screen.getByText(/Ready to transform your business/)).toBeInTheDocument()
  })

  test('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Business Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Tell me about your business and what you need')).toBeInTheDocument()
  })

  test('displays business type options', () => {
    render(<ContactForm />)
    
    const businessTypeSelect = screen.getByLabelText('Business Type')
    fireEvent.click(businessTypeSelect)
    
    expect(screen.getByText('Auto Shop / Repair')).toBeInTheDocument()
    expect(screen.getByText('Dental Practice')).toBeInTheDocument()
    expect(screen.getByText('Restaurant')).toBeInTheDocument()
    expect(screen.getByText('Construction')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
  })

  test('handles form input changes', () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Your Name')
    const emailInput = screen.getByLabelText('Email Address')
    const messageInput = screen.getByLabelText('Tell me about your business and what you need')
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'I need help with my business' } })
    
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('I need help with my business')
  })

  test('validates required fields on submission', async () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)
    
    // Should not submit with empty required fields
    expect(fetch).not.toHaveBeenCalled()
  })

  test('submits form with valid data', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<ContactForm />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Business Type'), { target: { value: 'auto' } })
    fireEvent.change(screen.getByLabelText('Tell me about your business and what you need'), { 
      target: { value: 'I need a CRM system' } 
    })
    
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          businessType: 'auto',
          message: 'I need a CRM system'
        })
      })
    })
  })

  test('displays success message after successful submission', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        success: true,
        message: 'Thank you for your message!'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<ContactForm />)
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Business Type'), { target: { value: 'auto' } })
    fireEvent.change(screen.getByLabelText('Tell me about your business and what you need'), { 
      target: { value: 'Test message' } 
    })
    
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText('Thank you for your message!')).toBeInTheDocument()
    })
  })

  test('handles submission errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Validation failed'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<ContactForm />)
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'invalid-email' } })
    fireEvent.change(screen.getByLabelText('Business Type'), { target: { value: 'auto' } })
    fireEvent.change(screen.getByLabelText('Tell me about your business and what you need'), { 
      target: { value: 'Test' } 
    })
    
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(screen.getByText(/There was an error sending your message/)).toBeInTheDocument()
    })
  })

  test('shows loading state during submission', async () => {
    const mockResponse = new Promise((resolve) => {
      setTimeout(() => resolve({
        ok: true,
        json: async () => ({ success: true, message: 'Success' })
      }), 100)
    })
    
    ;(global.fetch as jest.Mock).mockReturnValueOnce(mockResponse)
    
    render(<ContactForm />)
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Business Type'), { target: { value: 'auto' } })
    fireEvent.change(screen.getByLabelText('Tell me about your business and what you need'), { 
      target: { value: 'Test message' } 
    })
    
    fireEvent.click(screen.getByText('Send Message'))
    
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText('Sending...')).not.toBeInTheDocument()
    })
  })

  test('clears form after successful submission', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        success: true,
        message: 'Success'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Your Name') as HTMLInputElement
    const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement
    const messageInput = screen.getByLabelText('Tell me about your business and what you need') as HTMLTextAreaElement
    
    // Fill form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    fireEvent.click(screen.getByText('Send Message'))
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })
})