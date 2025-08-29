import { render, screen, fireEvent } from '@testing-library/react'
import { CaseStudies } from '@/components/CaseStudies/CaseStudies'

describe('CaseStudies Component', () => {
  test('renders section heading', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Real Businesses, Real Results')).toBeInTheDocument()
    expect(screen.getByText(/See how I've helped businesses transform their operations/)).toBeInTheDocument()
  })

  test('renders all case study cards', () => {
    render(<CaseStudies />)
    
    // Check for business names
    expect(screen.getByText("Adam's Muffler Shop")).toBeInTheDocument()
    expect(screen.getByText("Bella's Italian Kitchen")).toBeInTheDocument()
    expect(screen.getByText("Premier Construction Co.")).toBeInTheDocument()
  })

  test('displays case studies data structure', () => {
    render(<CaseStudies />)
    
    // The component loads case studies data and renders them
    // Let's verify the main business names are present (from featured section and cards)
    expect(screen.getAllByText("Adam's Muffler Shop").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Bella's Italian Kitchen").length).toBeGreaterThan(0) 
    expect(screen.getAllByText("Premier Construction Co.").length).toBeGreaterThan(0)
  })

  test('shows customer testimonial quotes', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText(/MyBusinessOS transformed how we operate/)).toBeInTheDocument()
    expect(screen.getByText(/The online ordering system alone doubled our takeout business/)).toBeInTheDocument()
    expect(screen.getByText(/We went from chaos to complete control/)).toBeInTheDocument()
  })

  test('displays customer author information', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('Adam Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Isabella Martinez')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText("Owner, Adam's Muffler Shop")).toBeInTheDocument()
    expect(screen.getByText("Owner, Bella's Italian Kitchen")).toBeInTheDocument()
    expect(screen.getByText('CEO, Premier Construction Co.')).toBeInTheDocument()
  })

  test('shows quantifiable results in featured section', () => {
    render(<CaseStudies />)
    
    // Check for metrics that are visible in the featured section
    expect(screen.getByText('$50,750')).toBeInTheDocument() // Monthly Revenue value
    expect(screen.getByText('4.8/5 stars')).toBeInTheDocument() // Customer Satisfaction value
    
    // Check for metric labels (using getAllByText since they appear multiple times)
    expect(screen.getAllByText('Monthly Revenue').length).toBeGreaterThan(0) // Label
    expect(screen.getAllByText('Customer Satisfaction').length).toBeGreaterThan(0) // Label
  })

  test('displays category filter buttons', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('All Projects (6)')).toBeInTheDocument()
    expect(screen.getByText('Business Systems (3)')).toBeInTheDocument()
    expect(screen.getByText('Agency → SaaS (1)')).toBeInTheDocument()
    expect(screen.getByText('E-commerce (1)')).toBeInTheDocument()
    expect(screen.getByText('Mobile Apps (1)')).toBeInTheDocument()
  })

  test('handles card hover interactions', () => {
    render(<CaseStudies />)
    
    const firstCard = screen.getByText("Adam's Muffler Shop").closest('div')
    expect(firstCard).toBeInTheDocument()
    
    if (firstCard) {
      fireEvent.mouseEnter(firstCard)
      fireEvent.mouseLeave(firstCard)
    }
  })

  test('displays system features in featured section', () => {
    render(<CaseStudies />)
    
    // Features from the featured section (first 4 features of first case study are shown)
    expect(screen.getByText('Real-time repair tracking with photos')).toBeInTheDocument()
    expect(screen.getByText('Automated SMS customer updates')).toBeInTheDocument()
    expect(screen.getByText('Digital inspection reports')).toBeInTheDocument()
    expect(screen.getByText('Parts inventory management')).toBeInTheDocument()
  })

  test('shows proper result metrics formatting', () => {
    render(<CaseStudies />)
    
    // Check that metrics are properly formatted
    const results = screen.getAllByText(/\+\d+%|\$[\d,]+|\d+\.\d+\/5/)
    expect(results.length).toBeGreaterThan(0)
  })

  test('displays featured success story section', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('⭐ Featured Success Story')).toBeInTheDocument()
    expect(screen.getByText('System Features')).toBeInTheDocument()
  })

  test('displays call to action buttons', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('Ready to join these successful businesses?')).toBeInTheDocument()
    expect(screen.getByText('Start Your Success Story')).toBeInTheDocument()
    expect(screen.getByText('Get Your Free Consultation')).toBeInTheDocument()
  })

  test('filters case studies by category', () => {
    render(<CaseStudies />)
    
    // Initially should show all case studies
    expect(screen.getByText("Adam's Muffler Shop")).toBeInTheDocument()
    expect(screen.getByText("Bella's Italian Kitchen")).toBeInTheDocument()
    expect(screen.getByText("Premier Construction Co.")).toBeInTheDocument()
    
    // Click on Business Systems filter
    const businessSystemsButton = screen.getByText('Business Systems (3)')
    fireEvent.click(businessSystemsButton)
    
    // Should still show the business management companies
    expect(screen.getByText("Adam's Muffler Shop")).toBeInTheDocument()
    expect(screen.getByText("Bella's Italian Kitchen")).toBeInTheDocument()
    expect(screen.getByText("Premier Construction Co.")).toBeInTheDocument()
  })

  test('component renders without errors', () => {
    render(<CaseStudies />)
    
    // Test that component loads case studies and renders main content
    expect(screen.getByText('Real Businesses, Real Results')).toBeInTheDocument()
    expect(screen.getByText('⭐ Featured Success Story')).toBeInTheDocument()
    expect(screen.getByText('System Features')).toBeInTheDocument()
  })
})