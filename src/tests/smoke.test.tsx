import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../components/Navbar'
import ParticleOverlay from '../three/ParticleOverlay'
import HeroSection from '../components/HeroSection'
import MenuSection from '../components/MenuSection'
import StorySection from '../components/StorySection'
import GallerySection from '../components/GallerySection'
import EventsSection from '../components/EventsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText(/Valinor Coffee/i)).toBeInTheDocument()
  })
})

describe('ParticleOverlay', () => {
  it('renders r3f canvas without crashing', () => {
    render(<ParticleOverlay mouseX={0} mouseY={0} />)
    expect(document.querySelector('[data-testid="r3f-canvas"]')).toBeInTheDocument()
  })
})

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Orta/i)).toBeInTheDocument()
  })
})

describe('MenuSection', () => {
  it('renders menu heading', () => {
    render(<MenuSection />)
    expect(screen.getByText(/Menümüz/i)).toBeInTheDocument()
  })
})

describe('StorySection', () => {
  it('renders heading', () => {
    render(<StorySection />)
    expect(screen.getByText(/Hikayemiz/i)).toBeInTheDocument()
  })
})

describe('GallerySection', () => {
  it('renders gallery heading', () => {
    render(<GallerySection />)
    expect(screen.getByText(/Galeri/i)).toBeInTheDocument()
  })
})

describe('EventsSection', () => {
  it('renders events heading', () => {
    render(<EventsSection />)
    expect(screen.getByText(/Etkinlikler/i)).toBeInTheDocument()
  })
})

describe('ContactSection', () => {
  it('renders contact form', () => {
    render(<ContactSection />)
    expect(screen.getByRole('button', { name: /Gönder/i })).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getAllByText(/Valinor Coffee/i).length).toBeGreaterThan(0)
  })
})
