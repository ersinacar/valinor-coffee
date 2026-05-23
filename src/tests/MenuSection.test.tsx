import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MenuSection from '../components/MenuSection'

describe('MenuSection', () => {
  it('shows all items by default', () => {
    render(<MenuSection />)
    expect(screen.getByText('Gandalf Espresso')).toBeInTheDocument()
    expect(screen.getByText('Shire Latte')).toBeInTheDocument()
    expect(screen.getByText('Rivendell Cold Brew')).toBeInTheDocument()
  })

  it('filters to Espresso category', async () => {
    render(<MenuSection />)
    fireEvent.click(screen.getByRole('button', { name: /Espresso/i }))
    expect(screen.getByText('Gandalf Espresso')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Shire Latte')).not.toBeInTheDocument(),
    )
  })

  it('filters to Latte category', async () => {
    render(<MenuSection />)
    fireEvent.click(screen.getByRole('button', { name: /Latte/i }))
    expect(screen.getByText('Shire Latte')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Gandalf Espresso')).not.toBeInTheDocument(),
    )
  })
})
