import { render, screen, waitFor } from '@testing-library/react'
import { ProjectBentoGrid } from '@/components/ProjectBentoGrid/ProjectBentoGrid'

describe('ProjectBentoGrid', () => {
  test('renders recent projects with images', async () => {
    render(<ProjectBentoGrid />)
    await waitFor(() => {
      expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    })

    // Only projects with real images should appear
    expect(screen.getByText('Business Management Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Workflow Automation System')).toBeInTheDocument()

    // Placeholder-only projects should not render
    expect(screen.queryByText('Construction Portal')).not.toBeInTheDocument()
    expect(screen.queryByText('Fitness Mobile App')).not.toBeInTheDocument()
  })
})
