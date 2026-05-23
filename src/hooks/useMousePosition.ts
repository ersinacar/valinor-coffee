import { useState, useEffect } from 'react'

interface MouseNDC {
  x: number // [-1, 1] left→right
  y: number // [-1, 1] bottom→top (Three.js convention)
}

export function useMousePosition(): MouseNDC {
  const [pos, setPos] = useState<MouseNDC>({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}
