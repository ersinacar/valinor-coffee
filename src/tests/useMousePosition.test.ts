import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useMousePosition } from '../hooks/useMousePosition'

describe('useMousePosition', () => {
  it('returns { x: 0, y: 0 } initially', () => {
    const { result } = renderHook(() => useMousePosition())
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('updates NDC coords on mousemove', () => {
    Object.defineProperty(window, 'innerWidth',  { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800,  configurable: true })

    const { result } = renderHook(() => useMousePosition())

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 750, clientY: 200 }))
    })

    // NDC x = (750/1000)*2 - 1 = 0.5
    expect(result.current.x).toBeCloseTo(0.5)
    // NDC y = -((200/800)*2 - 1) = 0.5
    expect(result.current.y).toBeCloseTo(0.5)
  })
})
