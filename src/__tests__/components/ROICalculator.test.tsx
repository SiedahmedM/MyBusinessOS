import { render, screen, fireEvent } from '@testing-library/react'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'

describe('ROICalculator Component', () => {
  test('renders calculator heading and description', () => {
    render(<ROICalculator />)
    expect(screen.getByText('Calculate Your ROI')).toBeInTheDocument()
    expect(
      screen.getByText(/See exactly how much CustomSoftwarePro solutions will save your business/)
    ).toBeInTheDocument()
  })

  test('renders all three calculator tabs', () => {
    render(<ROICalculator />)
    
    expect(screen.getByText('Time Savings')).toBeInTheDocument()
    expect(screen.getByText('Revenue Growth')).toBeInTheDocument()
    expect(screen.getByText('Cost Reduction')).toBeInTheDocument()
  })

  test('switches between calculator tabs', () => {
    render(<ROICalculator />)

    // Initially Time Savings tab should be active
    expect(screen.getByText('Hours per day on manual tasks')).toBeInTheDocument()

    // Click Revenue Growth tab
    fireEvent.click(screen.getByText('Revenue Growth'))
    expect(screen.getByText('Current monthly revenue ($)')).toBeInTheDocument()

    // Click Cost Reduction tab
    fireEvent.click(screen.getByText('Cost Reduction'))
    expect(screen.getByText('Monthly software subscriptions ($)')).toBeInTheDocument()
  })

  test('handles invalid input gracefully', () => {
    render(<ROICalculator />)

    const hoursLabel = screen.getByText('Hours per day on manual tasks')
    const hoursInput = hoursLabel.nextElementSibling as HTMLInputElement

    // Test negative input
    fireEvent.change(hoursInput, { target: { value: '-5' } })
    expect(hoursInput).toHaveValue(-5)
  })
})