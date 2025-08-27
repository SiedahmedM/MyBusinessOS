import { render, screen, fireEvent } from '@testing-library/react'
import { CaseStudies } from '@/components/CaseStudies/CaseStudies'

describe('CaseStudies Component', () => {
  test('renders section heading', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Success Stories')).toBeInTheDocument()
    expect(screen.getByText(/Real businesses, real results/)).toBeInTheDocument()
  })

  test('renders all case study cards', () => {
    render(<CaseStudies />)
    
    // Check for business names
    expect(screen.getByText("Adam's Muffler Shop")).toBeInTheDocument()
    expect(screen.getByText("Bella's Italian Kitchen")).toBeInTheDocument()
    expect(screen.getByText("Premier Construction Co.")).toBeInTheDocument()
  })

  test('displays business locations', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('Orange County, CA')).toBeInTheDocument()
    expect(screen.getByText('Costa Mesa, CA')).toBeInTheDocument()
    expect(screen.getByText('Irvine, CA')).toBeInTheDocument()
  })

  test('shows challenge descriptions', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText(/Struggled with manual appointment scheduling/)).toBeInTheDocument()
    expect(screen.getByText(/Lost orders due to phone-only ordering/)).toBeInTheDocument()
    expect(screen.getByText(/Inefficient project management/)).toBeInTheDocument()
  })

  test('displays solution descriptions', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText(/Built custom CRM with automated scheduling/)).toBeInTheDocument()
    expect(screen.getByText(/Developed online ordering platform/)).toBeInTheDocument()
    expect(screen.getByText(/Created project management dashboard/)).toBeInTheDocument()
  })

  test('shows quantifiable results', () => {
    render(<CaseStudies />)
    
    // Check for percentage improvements
    expect(screen.getByText('40%')).toBeInTheDocument() // Customer satisfaction
    expect(screen.getByText('60%')).toBeInTheDocument() // Revenue increase
    expect(screen.getByText('45%')).toBeInTheDocument() // Time savings
    
    // Check for time savings
    expect(screen.getByText('15 hrs/week')).toBeInTheDocument()
    expect(screen.getByText('25 hrs/week')).toBeInTheDocument()
    expect(screen.getByText('20 hrs/week')).toBeInTheDocument()
  })

  test('displays business type badges', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText('Auto Shop')).toBeInTheDocument()
    expect(screen.getByText('Restaurant')).toBeInTheDocument()
    expect(screen.getByText('Construction')).toBeInTheDocument()
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

  test('displays solution features correctly', () => {
    render(<CaseStudies />)
    
    // Auto shop features
    expect(screen.getByText('SMS notifications')).toBeInTheDocument()
    expect(screen.getByText('Inventory tracking')).toBeInTheDocument()
    expect(screen.getByText('Customer portal')).toBeInTheDocument()
    
    // Restaurant features
    expect(screen.getByText('Real-time menu updates')).toBeInTheDocument()
    expect(screen.getByText('Payment processing')).toBeInTheDocument()
    expect(screen.getByText('Delivery tracking')).toBeInTheDocument()
    
    // Construction features
    expect(screen.getByText('Resource allocation')).toBeInTheDocument()
    expect(screen.getByText('Timeline tracking')).toBeInTheDocument()
    expect(screen.getByText('Client communication')).toBeInTheDocument()
  })

  test('shows proper result metrics formatting', () => {
    render(<CaseStudies />)
    
    // Check that percentages and time savings are properly formatted
    const results = screen.getAllByText(/\d+%|\d+ hrs\/week/)
    expect(results.length).toBeGreaterThan(0)
  })

  test('displays business descriptions', () => {
    render(<CaseStudies />)
    
    expect(screen.getByText(/Family-owned auto repair shop/)).toBeInTheDocument()
    expect(screen.getByText(/Authentic Italian restaurant/)).toBeInTheDocument()
    expect(screen.getByText(/Full-service construction company/)).toBeInTheDocument()
  })
})