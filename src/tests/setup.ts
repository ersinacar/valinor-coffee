import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'
import { MotionGlobalConfig } from 'framer-motion'

// Skip Framer Motion animations in tests so AnimatePresence exits immediately
MotionGlobalConfig.skipAnimations = true

// jsdom doesn't implement IntersectionObserver (used by Framer Motion whileInView)
const mockIntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)

// jsdom doesn't implement ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
vi.stubGlobal('ResizeObserver', mockResizeObserver)

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'r3f-canvas' }, children),
  useFrame: vi.fn(),
  useThree: () => ({ viewport: { width: 10, height: 6 }, pointer: { x: 0, y: 0 } }),
}))

vi.mock('@react-three/drei', () => ({}))
