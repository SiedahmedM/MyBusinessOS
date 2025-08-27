import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ROICalculator } from '@/components/ROICalculator/ROICalculator'

describe('ROICalculator Component', () => {
  test('renders calculator heading and description', () => {
    render(<ROICalculator />)
    expect(screen.getByText('Calculate Your ROI')).toBeInTheDocument()
    expect(screen.getByText(/See exactly how much you could save/)).toBeInTheDocument()
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
    expect(screen.getByText('Hours saved per week')).toBeInTheDocument()
    
    // Click Revenue Growth tab
    fireEvent.click(screen.getByText('Revenue Growth'))
    expect(screen.getByText('Current monthly revenue')).toBeInTheDocument()
    
    // Click Cost Reduction tab
    fireEvent.click(screen.getByText('Cost Reduction'))
    expect(screen.getByText('Monthly operational cost')).toBeInTheDocument()
  })

  test('calculates time savings correctly', async () => {
    render(<ROICalculator />)
    
    // Input values for time savings calculation
    const hoursInput = screen.getByLabelText('Hours saved per week')
    const rateInput = screen.getByLabelText('Hourly rate ($)')
    
    fireEvent.change(hoursInput, { target: { value: '10' } })
    fireEvent.change(rateInput, { target: { value: '50' } })
    
    await waitFor(() => {
      expect(screen.getByText('$500')).toBeInTheDocument() // Weekly savings
      expect(screen.getByText('$2,165')).toBeInTheDocument() // Monthly savings
      expect(screen.getByText('$25,980')).toBeInTheDocument() // Yearly savings
    })
  })

  test('calculates revenue growth correctly', async () => {
    render(<ROICalculator />)
    
    // Switch to Revenue Growth tab
    fireEvent.click(screen.getByText('Revenue Growth'))
    
    const revenueInput = screen.getByLabelText('Current monthly revenue')
    const growthInput = screen.getByLabelText('Expected growth (%)')
    
    fireEvent.change(revenueInput, { target: { value: '10000' } })
    fireEvent.change(growthInput, { target: { value: '25' } })
    
    await waitFor(() => {
      expect(screen.getByText('$12,500')).toBeInTheDocument() // New revenue
      expect(screen.getByText('$2,500')).toBeInTheDocument() // Additional revenue
      expect(screen.getByText('$30,000')).toBeInTheDocument() // Yearly increase
    })
  })

  test('calculates cost reduction correctly', async () => {
    render(<ROICalculator />)
    
    // Switch to Cost Reduction tab
    fireEvent.click(screen.getByText('Cost Reduction'))
    
    const costInput = screen.getByLabelText('Monthly operational cost')
    const reductionInput = screen.getByLabelText('Cost reduction (%)')
    
    fireEvent.change(costInput, { target: { value: '5000' } })
    fireEvent.change(reductionInput, { target: { value: '20' } })
    
    await waitFor(() => {
      expect(screen.getByText('$4,000')).toBeInTheDocument() // New cost
      expect(screen.getByText('$1,000')).toBeInTheDocument() // Monthly savings
      expect(screen.getByText('$12,000')).toBeInTheDocument() // Yearly savings
    })
  })

  test('handles invalid input gracefully', () => {
    render(<ROICalculator />)
    
    const hoursInput = screen.getByLabelText('Hours saved per week')
    
    // Test negative input
    fireEvent.change(hoursInput, { target: { value: '-5' } })
    expect(hoursInput).toHaveValue(-5)
    
    // Test non-numeric input
    fireEvent.change(hoursInput, { target: { value: 'abc' } })
    expect(hoursInput).toHaveValue(null)
  })
})