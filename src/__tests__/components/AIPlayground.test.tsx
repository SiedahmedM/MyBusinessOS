import { render, screen } from '@testing-library/react'
import { AIPlayground } from '@/components/AIPlayground/AIPlayground'

describe('AIPlayground Component', () => {
  test('renders initial heading and description', () => {
    render(<AIPlayground />)
    expect(screen.getByText('Tell Our AI About Your Business')).toBeInTheDocument()
    expect(
      screen.getByText(/Chat with our AI to describe your business/i)
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Tell me about your business needs...')
    ).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
