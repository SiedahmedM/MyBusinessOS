import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AIPlayground } from '@/components/AIPlayground/AIPlayground'

// Mock the fetch function
global.fetch = jest.fn()

describe('AIPlayground Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders section heading and description', () => {
    render(<AIPlayground />)
    expect(screen.getByText('See AI Build Your App')).toBeInTheDocument()
    expect(screen.getByText(/Watch our AI analyze your business/)).toBeInTheDocument()
  })

  test('renders iPhone simulator', () => {
    render(<AIPlayground />)
    
    // Check for iPhone simulator elements
    expect(screen.getByText('9:41')).toBeInTheDocument() // Status bar time
    expect(screen.getByText('Building your app...')).toBeInTheDocument()
  })

  test('renders AI chat interface', () => {
    render(<AIPlayground />)
    
    expect(screen.getByText('Business Type Detector')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your business...')).toBeInTheDocument()
    expect(screen.getByText('Analyze Business')).toBeInTheDocument()
  })

  test('displays business type suggestion pills', () => {
    render(<AIPlayground />)
    
    expect(screen.getByText('Auto Repair Shop')).toBeInTheDocument()
    expect(screen.getByText('Dental Practice')).toBeInTheDocument()
    expect(screen.getByText('Restaurant')).toBeInTheDocument()
    expect(screen.getByText('Construction')).toBeInTheDocument()
  })

  test('handles business type pill clicks', async () => {
    render(<AIPlayground />)
    
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    const autoPill = screen.getByText('Auto Repair Shop')
    
    fireEvent.click(autoPill)
    
    await waitFor(() => {
      expect(textarea).toHaveValue('I run an auto repair shop and need help with')
    })
  })

  test('handles form submission with valid input', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        businessType: 'auto',
        response: 'Based on your auto shop, I recommend...'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<AIPlayground />)
    
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    const submitButton = screen.getByText('Analyze Business')
    
    fireEvent.change(textarea, { target: { value: 'I run an auto repair shop' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/ai-playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessDescription: 'I run an auto repair shop' })
      })
    })
  })

  test('prevents submission with empty input', () => {
    render(<AIPlayground />)
    
    const submitButton = screen.getByText('Analyze Business')
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    
    // Try to submit with empty input
    fireEvent.click(submitButton)
    
    expect(fetch).not.toHaveBeenCalled()
    expect(textarea).toHaveValue('')
  })

  test('displays loading state during analysis', async () => {
    const mockResponse = new Promise((resolve) => {
      setTimeout(() => resolve({
        ok: true,
        json: async () => ({
          businessType: 'auto',
          response: 'Test response'
        })
      }), 100)
    })
    
    ;(global.fetch as jest.Mock).mockReturnValueOnce(mockResponse)
    
    render(<AIPlayground />)
    
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    const submitButton = screen.getByText('Analyze Business')
    
    fireEvent.change(textarea, { target: { value: 'Test business' } })
    fireEvent.click(submitButton)
    
    // Check for loading state
    expect(screen.getByText('Analyzing...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText('Analyzing...')).not.toBeInTheDocument()
    })
  })

  test('handles API error gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 500
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<AIPlayground />)
    
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    const submitButton = screen.getByText('Analyze Business')
    
    fireEvent.change(textarea, { target: { value: 'Test business' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Sorry, there was an error/)).toBeInTheDocument()
    })
  })

  test('updates iPhone simulator based on detected business type', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        businessType: 'dental',
        response: 'Dental practice response'
      })
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)
    
    render(<AIPlayground />)
    
    const textarea = screen.getByPlaceholderText('Tell me about your business...')
    const submitButton = screen.getByText('Analyze Business')
    
    fireEvent.change(textarea, { target: { value: 'I run a dental practice' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('SmartDental Pro')).toBeInTheDocument()
    })
  })
})