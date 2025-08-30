import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero/Hero'

describe('Hero Component', () => {
  test('renders hero heading', () => {
    render(<Hero />)
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(screen.getByText('Transforms')).toBeInTheDocument()
  })

  test('renders expert developer badge', () => {
    render(<Hero />)
    expect(screen.getByText('Expert Developer • Orange County, CA')).toBeInTheDocument()
  })

  test('renders action buttons', () => {
    render(<Hero />)

    const consultButton = screen.getByText(/Book Free Consultation/)
    expect(consultButton).toBeInTheDocument()

    const examplesButton = screen.getByText(/View Examples/)
    expect(examplesButton).toBeInTheDocument()
  })

  test('typing animation is present', () => {
    render(<Hero />)
    
    // The typing animation container should be present
    expect(document.querySelector('.text-xl.md\\:text-2xl')).toBeInTheDocument()
  })

  test('company logos are rendered', () => {
    render(<Hero />)

    expect(screen.getByAltText('Microsoft')).toBeInTheDocument()
    expect(screen.getByAltText('Zillow')).toBeInTheDocument()
    expect(screen.getByAltText('Accenture')).toBeInTheDocument()
    expect(screen.getByAltText('Realtor.com')).toBeInTheDocument()
  })
})