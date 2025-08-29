import { render, screen } from '@testing-library/react'
import { TechShowcase } from '@/components/TechShowcase/TechShowcase'

describe('TechShowcase Component', () => {
  test('renders section heading', () => {
    render(<TechShowcase />)
    expect(
      screen.getByText('Cutting-Edge Technology Stack')
    ).toBeInTheDocument()
    expect(
      screen.getByText('The same technologies used by Netflix, Uber, and Tesla')
    ).toBeInTheDocument()
  })

  test('lists core technology features', () => {
    render(<TechShowcase />)
    expect(screen.getByText('Enterprise Security')).toBeInTheDocument()
    expect(screen.getByText('Real-time Features')).toBeInTheDocument()
    expect(screen.getByText('Mobile Optimization')).toBeInTheDocument()
    expect(screen.getByText('Scalable Architecture')).toBeInTheDocument()
  })
})