import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VisualProjectShowcase } from '@/components/VisualProjectShowcase/VisualProjectShowcase'

// Mock the logger
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  }
}))

// Mock scrollIntoView
const mockScrollIntoView = jest.fn()
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true
})

describe('VisualProjectShowcase', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockScrollIntoView.mockClear()
  })

  it('renders project showcase header', () => {
    render(<VisualProjectShowcase />)
    
    expect(screen.getByText('Project Showcase')).toBeInTheDocument()
    expect(screen.getByText(/Real projects that transformed businesses/)).toBeInTheDocument()
  })

  it('renders all project cards', () => {
    render(<VisualProjectShowcase />)
    
    // Check that key projects are rendered
    expect(screen.getByText("Adam's Auto CRM")).toBeInTheDocument()
    expect(screen.getByText('Restaurant POS System')).toBeInTheDocument()
    expect(screen.getByText('Construction Client Portal')).toBeInTheDocument()
  })

  it('displays project categories', () => {
    render(<VisualProjectShowcase />)
    
    expect(screen.getByText('Business Management')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()
    expect(screen.getByText('Project Management')).toBeInTheDocument()
  })

  it('shows project results', () => {
    render(<VisualProjectShowcase />)
    
    expect(screen.getByText('+45% revenue, 15 hours saved/week')).toBeInTheDocument()
    expect(screen.getByText('+65% revenue, 99.2% order accuracy')).toBeInTheDocument()
  })

  it('expands project details when clicked', async () => {
    render(<VisualProjectShowcase />)
    
    const projectCard = screen.getByText("Adam's Auto CRM").closest('[role="button"]')
    expect(projectCard).toBeInTheDocument()
    
    fireEvent.click(projectCard!)
    
    await waitFor(() => {
      expect(screen.getByText('Challenge')).toBeInTheDocument()
      expect(screen.getByText('Solution')).toBeInTheDocument()
    })
  })

  it('collapses project details when clicked again', async () => {
    render(<VisualProjectShowcase />)
    
    const projectCard = screen.getByText("Adam's Auto CRM").closest('[role="button"]')
    
    // Expand
    fireEvent.click(projectCard!)
    await waitFor(() => {
      expect(screen.getByText('Challenge')).toBeInTheDocument()
    })
    
    // Collapse
    fireEvent.click(projectCard!)
    await waitFor(() => {
      expect(screen.queryByText('Challenge')).not.toBeInTheDocument()
    })
  })

  it('handles keyboard navigation', async () => {
    render(<VisualProjectShowcase />)
    
    const projectCard = screen.getByText("Adam's Auto CRM").closest('[role="button"]')
    
    fireEvent.keyDown(projectCard!, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByText('Challenge')).toBeInTheDocument()
    })
  })

  it('displays fallback when image fails to load', () => {
    render(<VisualProjectShowcase />)
    
    const images = screen.getAllByRole('img')
    
    // Simulate image load error
    fireEvent.error(images[0])
    
    // Should show fallback with icon and title
    expect(screen.getByText("Adam's Auto CRM")).toBeInTheDocument()
  })

  it('handles CTA button clicks', () => {
    // Mock getElementById
    const mockElement = {
      scrollIntoView: mockScrollIntoView
    }
    
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
    
    render(<VisualProjectShowcase />)
    
    const startProjectBtn = screen.getByText('Start Your Project')
    fireEvent.click(startProjectBtn)
    
    expect(document.getElementById).toHaveBeenCalledWith('ai-playground')
  })

  it('shows hover overlay text correctly', async () => {
    render(<VisualProjectShowcase />)
    
    // Initially should show "View Details"
    expect(screen.getAllByText('View Details').length).toBeGreaterThan(0)
    
    // Click to expand
    const projectCard = screen.getByText("Adam's Auto CRM").closest('[role="button"]')
    fireEvent.click(projectCard!)
    
    // Should now show "Hide Details"
    await waitFor(() => {
      expect(screen.getAllByText('Hide Details').length).toBeGreaterThan(0)
    })
  })

  it('renders technology tags', () => {
    render(<VisualProjectShowcase />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
  })

  it('handles errors gracefully', () => {
    // Mock console.error to prevent error output in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<VisualProjectShowcase />)
    
    // Component should render without crashing even if there are errors
    expect(screen.getByText('Project Showcase')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('has proper accessibility attributes', () => {
    render(<VisualProjectShowcase />)
    
    const projectButtons = screen.getAllByRole('button', { name: /View details for/i })
    expect(projectButtons.length).toBeGreaterThan(0)
    
    projectButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('tabIndex', '0')
    })
  })

  it('renders CTA section', () => {
    render(<VisualProjectShowcase />)
    
    expect(screen.getByText('Ready to See Your Project Here?')).toBeInTheDocument()
    expect(screen.getByText(/Every project is custom-built/)).toBeInTheDocument()
    expect(screen.getByText('Start Your Project')).toBeInTheDocument()
    expect(screen.getByText('Get Free Quote')).toBeInTheDocument()
  })
})