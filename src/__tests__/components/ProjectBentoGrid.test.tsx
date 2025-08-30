import { render, screen, waitFor } from '@testing-library/react'
import { ProjectBentoGrid } from '@/components/ProjectBentoGrid/ProjectBentoGrid'

describe('ProjectBentoGrid', () => {
  test('renders four project cards', async () => {
    render(<ProjectBentoGrid />)
    await waitFor(() => {
      expect(screen.getByText('Project Showcase')).toBeInTheDocument()
    })
    const titles = ['Auto Shop CRM', 'Restaurant POS', 'Construction Portal', 'Fitness App']
    for (const title of titles) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })
})
