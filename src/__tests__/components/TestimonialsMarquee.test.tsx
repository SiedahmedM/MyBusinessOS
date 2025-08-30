import { render, screen, waitFor } from '@testing-library/react'
import { TestimonialsMarquee } from '@/components/TestimonialsMarquee/TestimonialsMarquee'

describe('TestimonialsMarquee', () => {
  test('renders testimonials', async () => {
    render(<TestimonialsMarquee />)
    await waitFor(() => {
      expect(screen.getByText('What Clients Say')).toBeInTheDocument()
    })
    const quotes = [
      /delivered ahead of schedule/i,
      /transformed how clients interact/i,
      /Revenue jumped 40%/i
    ]
    for (const quote of quotes) {
      expect(screen.getAllByText(quote)[0]).toBeInTheDocument()
    }
  })
})
