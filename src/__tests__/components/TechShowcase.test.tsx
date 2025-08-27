import { render, screen, fireEvent } from '@testing-library/react'
import { TechShowcase } from '@/components/TechShowcase/TechShowcase'

describe('TechShowcase Component', () => {
  test('renders section heading', () => {
    render(<TechShowcase />)
    expect(screen.getByText('Technology That Powers Success')).toBeInTheDocument()
    expect(screen.getByText(/I use cutting-edge technology/)).toBeInTheDocument()
  })

  test('renders all technology cards', () => {
    render(<TechShowcase />)
    
    // Check for technology cards
    expect(screen.getByText('Next.js 14')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
    expect(screen.getByText('OpenAI API')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    expect(screen.getByText('Framer Motion')).toBeInTheDocument()
  })

  test('renders code preview with syntax highlighting', () => {
    render(<TechShowcase />)
    
    // Check for code preview content
    expect(screen.getByText('const')).toBeInTheDocument()
    expect(screen.getByText('businessAutomation')).toBeInTheDocument()
    expect(screen.getByText('async')).toBeInTheDocument()
  })

  test('handles technology card hover interactions', () => {
    render(<TechShowcase />)
    
    const nextjsCard = screen.getByText('Next.js 14').closest('div')
    expect(nextjsCard).toBeInTheDocument()
    
    // Simulate hover to trigger any animations
    if (nextjsCard) {
      fireEvent.mouseEnter(nextjsCard)
      fireEvent.mouseLeave(nextjsCard)
    }
  })

  test('displays feature descriptions for technologies', () => {
    render(<TechShowcase />)
    
    expect(screen.getByText(/Full-stack React framework/)).toBeInTheDocument()
    expect(screen.getByText(/Type-safe development/)).toBeInTheDocument()
    expect(screen.getByText(/Real-time database/)).toBeInTheDocument()
    expect(screen.getByText(/AI-powered automation/)).toBeInTheDocument()
  })
})