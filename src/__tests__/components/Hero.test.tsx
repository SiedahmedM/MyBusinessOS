import { render, screen, waitFor } from '@testing-library/react'
import { Hero } from '@/components/Hero/Hero'

describe('Hero Component', () => {
  test('renders hero heading', () => {
    render(<Hero />)
    expect(screen.getByText(/I Build Software That/)).toBeInTheDocument()
    expect(screen.getByText(/Transforms Businesses/)).toBeInTheDocument()
  })

  test('renders expert developer badge', () => {
    render(<Hero />)
    expect(screen.getByText('Expert Developer • Orange County')).toBeInTheDocument()
  })

  test('renders action buttons', () => {
    render(<Hero />)
    
    const workButton = screen.getByText(/See My Work In Action/)
    expect(workButton).toBeInTheDocument()
    
    const storiesButton = screen.getByText(/View Success Stories/)
    expect(storiesButton).toBeInTheDocument()
  })

  test('typing animation is present', () => {
    render(<Hero />)
    
    // The typing animation container should be present
    expect(document.querySelector('.text-xl.md\\:text-2xl')).toBeInTheDocument()
  })

  test('counter stats are rendered', async () => {
    render(<Hero />)
    
    // Check for stat labels
    await waitFor(() => {
      expect(screen.getByText('Lower Cost')).toBeInTheDocument()
      expect(screen.getByText('Faster Delivery')).toBeInTheDocument()
      expect(screen.getByText('On-Time Rate')).toBeInTheDocument()
      expect(screen.getByText('Average ROI')).toBeInTheDocument()
    })
  })
})