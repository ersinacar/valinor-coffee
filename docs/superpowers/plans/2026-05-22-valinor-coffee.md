# Valinor Coffee — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a LOTR "Shire"-themed single-page coffee shop website with a Valinor video hero, Three.js mouse-reactive particle overlay, Framer Motion scroll animations, and Netlify deployment.

**Architecture:** Vite + React 18 + TypeScript SPA. Six sections scroll vertically in `App.tsx`. Three.js `<Canvas>` sits absolutely over the hero video, renders 400 gold particles that scatter from the mouse cursor. All scroll animations use Framer Motion `whileInView` with `once: true`.

**Tech Stack:** Vite 6, React 18, TypeScript 5, Tailwind CSS 3, Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion, Vitest, `@testing-library/react`

---

## File Map

```
/home/claw/valinor-coffee/
  index.html                         ← Vite entry + hidden Netlify form
  vite.config.ts                     ← port 3007, react plugin
  tailwind.config.js                 ← Shire colour palette
  postcss.config.js
  netlify.toml                       ← build command + publish dir
  src/
    main.tsx                         ← React root mount
    App.tsx                          ← section order
    index.css                        ← Tailwind directives + Google Font import
    hooks/
      useMousePosition.ts            ← NDC mouse coords [-1,1]
    three/
      ParticleOverlay.tsx            ← r3f Canvas + Particles component
    components/
      Navbar.tsx                     ← sticky, blur on scroll
      HeroSection.tsx                ← video bg + ParticleOverlay + CTA
      MenuSection.tsx                ← category filter + card grid
      StorySection.tsx               ← parallax two-column
      GallerySection.tsx             ← masonry grid + lightbox
      EventsSection.tsx              ← event card list
      ContactSection.tsx             ← Netlify form + map
      Footer.tsx
  public/
    video/hero.mp4                   ← already uploaded
  src/tests/
    useMousePosition.test.ts
    MenuSection.test.tsx
    smoke.test.tsx                   ← each section renders
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`

- [ ] **Step 1: Scaffold with Vite**

```bash
cd /home/claw/valinor-coffee
npm create vite@latest . -- --template react-ts
# When prompted "Current directory is not empty" → select "Ignore files and continue"
```

- [ ] **Step 2: Install all dependencies**

```bash
npm install
npm install framer-motion three @react-three/fiber @react-three/drei
npm install -D tailwindcss postcss autoprefixer @types/three vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
npx tailwindcss init -p
```

- [ ] **Step 3: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3007 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
})
```

- [ ] **Step 4: Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:  '#0d1a07',
        shire:   '#2d5016',
        grass:   '#4a7c2f',
        coffee:  '#8b6914',
        gold:    '#c8a84b',
        cream:   '#f5e6a3',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Write test setup file `src/tests/setup.ts`**

```ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="r3f-canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ viewport: { width: 10, height: 6 }, pointer: { x: 0, y: 0 } }),
}))

vi.mock('@react-three/drei', () => ({}))
```

- [ ] **Step 6: Verify scaffold builds**

```bash
npm run build
```
Expected: `dist/` folder created, no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind + Three.js"
```

---

## Task 2: CSS Foundation

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Update `index.html` — Google Fonts + Netlify hidden form**

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
    <title>Valinor Coffee</title>
  </head>
  <body>
    <!-- Hidden form for Netlify Forms detection (required for CSR apps) -->
    <form name="contact" netlify hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-forest text-cream font-body;
  }
  h1, h2, h3 {
    @apply font-display;
  }
}

@layer utilities {
  .section-padding {
    @apply px-6 py-24 md:px-16 lg:px-24;
  }
}
```

- [ ] **Step 3: Write `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 4: Verify dev server starts on port 3007**

```bash
npm run dev
```
Expected: `Local: http://localhost:3007/`

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css src/main.tsx
git commit -m "feat: CSS foundation, fonts, Netlify hidden form"
```

---

## Task 3: `useMousePosition` Hook

**Files:**
- Create: `src/hooks/useMousePosition.ts`
- Create: `src/tests/useMousePosition.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/tests/useMousePosition.test.ts
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
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })

    const { result } = renderHook(() => useMousePosition())

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 750, clientY: 200 }),
      )
    })

    // NDC x = (750 / 1000) * 2 - 1 = 0.5
    expect(result.current.x).toBeCloseTo(0.5)
    // NDC y = -((200 / 800) * 2 - 1) = 0.5
    expect(result.current.y).toBeCloseTo(0.5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/tests/useMousePosition.test.ts
```
Expected: FAIL — `useMousePosition` not found.

- [ ] **Step 3: Implement `src/hooks/useMousePosition.ts`**

```ts
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
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/tests/useMousePosition.test.ts
```
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useMousePosition.ts src/tests/useMousePosition.test.ts
git commit -m "feat: useMousePosition hook with NDC conversion"
```

---

## Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`
- Add smoke test to: `src/tests/smoke.test.tsx`

- [ ] **Step 1: Create `src/tests/smoke.test.tsx` with Navbar test**

```tsx
// src/tests/smoke.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '../components/Navbar'

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar />)
    expect(screen.getByText(/Valinor Coffee/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL — `Navbar` not found.

- [ ] **Step 3: Implement `src/components/Navbar.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Menü', href: '#menu' },
  { label: 'Hikayemiz', href: '#story' },
  { label: 'Galeri', href: '#gallery' },
  { label: 'Etkinlikler', href: '#events' },
  { label: 'İletişim', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
        scrolled ? 'bg-forest/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <a href="#" className="font-display text-gold text-lg tracking-widest">
        Valinor Coffee
      </a>
      <ul className="hidden md:flex gap-8">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-cream/80 hover:text-gold text-sm tracking-wider transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
```

- [ ] **Step 4: Run smoke test to verify it passes**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/tests/smoke.test.tsx
git commit -m "feat: sticky Navbar with scroll blur"
```

---

## Task 5: Three.js Particle Overlay

**Files:**
- Create: `src/three/ParticleOverlay.tsx`

- [ ] **Step 1: Add Three.js canvas mock test to `smoke.test.tsx`**

```tsx
// append to src/tests/smoke.test.tsx
import ParticleOverlay from '../three/ParticleOverlay'

describe('ParticleOverlay', () => {
  it('renders r3f canvas without crashing', () => {
    render(<ParticleOverlay mouseX={0} mouseY={0} />)
    expect(document.querySelector('[data-testid="r3f-canvas"]')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL — `ParticleOverlay` not found.

- [ ] **Step 3: Implement `src/three/ParticleOverlay.tsx`**

```tsx
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 400
const REPEL_R = 1.2
const REPEL_F = 0.04
const RETURN  = 0.025
const DAMP    = 0.88

interface ParticlesProps { mouseX: number; mouseY: number }

function Particles({ mouseX, mouseY }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()

  const { base, vel, cur } = useMemo(() => {
    const base = new Float32Array(COUNT * 3)
    const vel  = new Float32Array(COUNT * 3)
    const cur  = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * (viewport.width  || 8)
      const y = (Math.random() - 0.5) * (viewport.height || 5)
      base[i*3]=cur[i*3]=x
      base[i*3+1]=cur[i*3+1]=y
      base[i*3+2]=cur[i*3+2]=0
    }
    return { base, vel, cur }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(({ viewport }) => {
    if (!ref.current) return
    const mx = mouseX * (viewport.width  / 2)
    const my = mouseY * (viewport.height / 2)

    for (let i = 0; i < COUNT; i++) {
      const ix=i*3, iy=i*3+1
      const dx = cur[ix] - mx
      const dy = cur[iy] - my
      const dist = Math.sqrt(dx*dx + dy*dy) || 0.001

      if (dist < REPEL_R) {
        const f = (REPEL_R - dist) * REPEL_F
        vel[ix] += (dx / dist) * f
        vel[iy] += (dy / dist) * f
      }

      vel[ix] += (base[ix] - cur[ix]) * RETURN
      vel[iy] += (base[iy] - cur[iy]) * RETURN
      vel[ix] *= DAMP
      vel[iy] *= DAMP
      cur[ix] += vel[ix]
      cur[iy] += vel[iy]
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={cur}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c8a84b"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

interface Props { mouseX: number; mouseY: number }

export default function ParticleOverlay({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: false }}
    >
      <Particles mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  )
}
```

- [ ] **Step 4: Run smoke test to verify it passes**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/three/ParticleOverlay.tsx src/tests/smoke.test.tsx
git commit -m "feat: Three.js mouse-reactive particle overlay"
```

---

## Task 6: HeroSection

**Files:**
- Create: `src/components/HeroSection.tsx`

- [ ] **Step 1: Add smoke test**

```tsx
// append to src/tests/smoke.test.tsx
import HeroSection from '../components/HeroSection'

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Orta Dünya/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/HeroSection.tsx`**

```tsx
import { motion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'
import ParticleOverlay from '../three/ParticleOverlay'

const TAGLINE_WORDS = ['Orta', "Dünya'nın", 'En', 'İyi', 'Kahvesi']

export default function HeroSection() {
  const mouse = useMousePosition()

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay to improve text contrast */}
      <div className="absolute inset-0 bg-forest/50" />

      {/* Three.js particle canvas */}
      <ParticleOverlay mouseX={mouse.x} mouseY={mouse.y} />

      {/* Foreground text */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gold text-sm tracking-[0.4em] uppercase"
        >
          Valinor Coffee
        </motion.p>

        <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight">
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-cream/70 text-lg max-w-md"
        >
          Her yudumda bir macera, her fincanda bir hikaye.
        </motion.p>

        <motion.a
          href="#menu"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 border border-gold text-gold px-8 py-3 font-display text-sm tracking-widest hover:bg-gold hover:text-forest transition-colors duration-300"
        >
          Keşfet ↓
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gold/40"
        />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run smoke test**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.tsx src/tests/smoke.test.tsx
git commit -m "feat: HeroSection with video bg and particle overlay"
```

---

## Task 7: MenuSection

**Files:**
- Create: `src/components/MenuSection.tsx`
- Create: `src/tests/MenuSection.test.tsx`

- [ ] **Step 1: Write the failing filter test**

```tsx
// src/tests/MenuSection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MenuSection from '../components/MenuSection'

describe('MenuSection', () => {
  it('shows all items by default', () => {
    render(<MenuSection />)
    expect(screen.getByText('Gandalf Espresso')).toBeInTheDocument()
    expect(screen.getByText('Shire Latte')).toBeInTheDocument()
    expect(screen.getByText('Rivendell Cold Brew')).toBeInTheDocument()
  })

  it('filters to Espresso category', () => {
    render(<MenuSection />)
    fireEvent.click(screen.getByRole('button', { name: /Espresso/i }))
    expect(screen.getByText('Gandalf Espresso')).toBeInTheDocument()
    expect(screen.queryByText('Shire Latte')).not.toBeInTheDocument()
  })

  it('filters to Latte category', () => {
    render(<MenuSection />)
    fireEvent.click(screen.getByRole('button', { name: /Latte/i }))
    expect(screen.getByText('Shire Latte')).toBeInTheDocument()
    expect(screen.queryByText('Gandalf Espresso')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/MenuSection.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/MenuSection.tsx`**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItem {
  id: string
  name: string
  desc: string
  price: string
  category: 'Espresso' | 'Latte' | 'Cold Brew' | 'Seasonal'
}

const ITEMS: MenuItem[] = [
  { id: 'gandalf',  name: 'Gandalf Espresso',     desc: 'Derin, güçlü, akıllıca — tek shot yeter.',         price: '₺65',  category: 'Espresso'  },
  { id: 'aragorn',  name: 'Aragorn Americano',     desc: 'Uzun yolculuklara dayanır, soğumaz.',              price: '₺70',  category: 'Espresso'  },
  { id: 'shire',    name: 'Shire Latte',           desc: 'Sütlü, yumuşak, Hobbiton gibi huzurlu.',           price: '₺80',  category: 'Latte'     },
  { id: 'frodo',    name: 'Frodo Flat White',      desc: 'Küçük ama cesur. Yük taşır.',                      price: '₺80',  category: 'Latte'     },
  { id: 'arwen',    name: 'Arwen Lavanta Latte',   desc: 'Elfçe bir lütuf, mor çiçek kokusu.',               price: '₺90',  category: 'Latte'     },
  { id: 'cold',     name: 'Rivendell Cold Brew',   desc: '24 saat demlenir, ebediyet gibi soğuk.',           price: '₺95',  category: 'Cold Brew' },
  { id: 'mordor',   name: 'Mordor Dark Roast',     desc: 'Uçurumun tam kavurması. Zayıf olanlar için değil.',price: '₺75',  category: 'Espresso'  },
  { id: 'galadriel',name: 'Galadriel Matcha',      desc: 'Lothlórien ormanından gelir, yeşil ve saf.',       price: '₺95',  category: 'Seasonal'  },
  { id: 'merry',    name: 'Merry Pumpkin Spice',   desc: 'Sonbahar kampanyası — Hvite Dağlar baharatı.',     price: '₺90',  category: 'Seasonal'  },
]

const CATEGORIES = ['Tümü', 'Espresso', 'Latte', 'Cold Brew', 'Seasonal'] as const

export default function MenuSection() {
  const [active, setActive] = useState<string>('Tümü')

  const filtered = active === 'Tümü' ? ITEMS : ITEMS.filter((i) => i.category === active)

  return (
    <section id="menu" className="section-padding bg-forest">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-4"
        >
          Menümüz
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-cream/60 text-center mb-12 tracking-wide"
        >
          Orta Dünya'dan ilham alan her yudum
        </motion.p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm tracking-wider font-display border transition-colors duration-200 ${
                active === cat
                  ? 'bg-gold text-forest border-gold'
                  : 'border-grass text-cream/70 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="border border-grass/30 p-6 hover:border-gold/60 transition-colors duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-gold text-lg">{item.name}</h3>
                  <span className="text-coffee font-semibold">{item.price}</span>
                </div>
                <p className="text-cream/60 text-sm leading-relaxed">{item.desc}</p>
                <span className="mt-3 inline-block text-xs tracking-widest text-grass/70 uppercase">
                  {item.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/tests/MenuSection.test.tsx
```
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/MenuSection.tsx src/tests/MenuSection.test.tsx
git commit -m "feat: MenuSection with LOTR items and category filter"
```

---

## Task 8: StorySection

**Files:**
- Create: `src/components/StorySection.tsx`

- [ ] **Step 1: Add smoke test**

```tsx
// append to src/tests/smoke.test.tsx
import StorySection from '../components/StorySection'

describe('StorySection', () => {
  it('renders heading', () => {
    render(<StorySection />)
    expect(screen.getByText(/Hikayemiz/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/StorySection.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" ref={ref} className="section-padding bg-shire/20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-xs tracking-[0.4em] uppercase block mb-4"
          >
            Köklerimiz
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl text-cream mb-8"
          >
            Hikayemiz
          </motion.h2>
          {[
            'Valinor Coffee, Tolkien\'in eserlerinden ilham alarak kurulmuş bir kahve atelyesidir. Her içeceğimiz, Orta Dünya\'nın farklı bir köşesinden taşınan bir özü yansıtır.',
            'Hobbit\'lerin sofrasındaki sıcaklıkla hazırlanan kahvelerimiz, her yudumda sizi derin ormanlara, karlı dağların eteklerine ve altın tarlalara götürür.',
            'Yerel çiftçilerden özenle seçilen, etik kaynaklı çekirdeklerimizle macera her fincanda başlar.',
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="text-cream/70 leading-relaxed mb-5"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Parallax image placeholder */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 bg-gradient-to-br from-shire via-grass to-forest flex items-center justify-center"
          >
            <span className="text-gold/30 font-display text-xl">Fotoğraf yakında</span>
          </motion.div>
          <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run smoke test**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/StorySection.tsx src/tests/smoke.test.tsx
git commit -m "feat: StorySection with parallax scroll"
```

---

## Task 9: GallerySection + Lightbox

**Files:**
- Create: `src/components/GallerySection.tsx`

- [ ] **Step 1: Add smoke test**

```tsx
// append to src/tests/smoke.test.tsx
import GallerySection from '../components/GallerySection'

describe('GallerySection', () => {
  it('renders gallery heading', () => {
    render(<GallerySection />)
    expect(screen.getByText(/Galeri/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/GallerySection.tsx`**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem { id: number; alt: string; aspect: 'tall' | 'wide' | 'square' }

const ITEMS: GalleryItem[] = [
  { id: 1,  alt: 'Shire kahvaltısı',             aspect: 'tall'   },
  { id: 2,  alt: 'Gandalf espresso',              aspect: 'square' },
  { id: 3,  alt: 'Elvenkind dekorasyonu',         aspect: 'wide'   },
  { id: 4,  alt: 'Hobbit kapısı detayı',          aspect: 'tall'   },
  { id: 5,  alt: 'Mordor dark roast',             aspect: 'square' },
  { id: 6,  alt: 'Mekân iç görünüş',             aspect: 'wide'   },
  { id: 7,  alt: 'Barista kahve sanatı',          aspect: 'square' },
  { id: 8,  alt: 'Kitaplık köşesi',              aspect: 'tall'   },
  { id: 9,  alt: 'Rivendell cold brew hazırlığı', aspect: 'square' },
]

const ASPECT_CLASS: Record<GalleryItem['aspect'], string> = {
  tall:   'row-span-2',
  wide:   'col-span-2',
  square: '',
}

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null)

  const current = selected !== null ? ITEMS[selected] : null
  const total   = ITEMS.length

  return (
    <section id="gallery" className="section-padding bg-forest">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-16"
        >
          Galeri
        </motion.h2>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(i)}
              className={`bg-gradient-to-br from-shire to-forest cursor-pointer overflow-hidden relative ${ASPECT_CLASS[item.aspect]}`}
            >
              <div className="absolute inset-0 flex items-end p-3 bg-forest/0 hover:bg-forest/40 transition-colors duration-300">
                <span className="text-cream/0 hover:text-cream/80 text-xs transition-colors duration-300">
                  {item.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest/95 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full mx-6 bg-shire/20 aspect-video flex items-center justify-center border border-gold/20"
            >
              <span className="text-cream/50 font-display">{current.alt}</span>

              {/* Prev */}
              <button
                onClick={() => setSelected((s) => (s! > 0 ? s! - 1 : total - 1))}
                className="absolute left-3 text-gold text-2xl hover:scale-110 transition-transform"
                aria-label="Önceki"
              >
                ←
              </button>

              {/* Next */}
              <button
                onClick={() => setSelected((s) => (s! < total - 1 ? s! + 1 : 0))}
                className="absolute right-3 text-gold text-2xl hover:scale-110 transition-transform"
                aria-label="Sonraki"
              >
                →
              </button>

              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-cream/60 hover:text-gold text-xl"
                aria-label="Kapat"
              >
                ✕
              </button>

              <span className="absolute bottom-3 right-3 text-cream/40 text-xs">
                {selected + 1} / {total}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
```

- [ ] **Step 4: Run smoke test**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/GallerySection.tsx src/tests/smoke.test.tsx
git commit -m "feat: GallerySection masonry grid + lightbox"
```

---

## Task 10: EventsSection

**Files:**
- Create: `src/components/EventsSection.tsx`

- [ ] **Step 1: Add smoke test**

```tsx
// append to src/tests/smoke.test.tsx
import EventsSection from '../components/EventsSection'

describe('EventsSection', () => {
  it('renders events heading', () => {
    render(<EventsSection />)
    expect(screen.getByText(/Etkinlikler/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/EventsSection.tsx`**

```tsx
import { motion } from 'framer-motion'

interface Event { id: string; title: string; date: string; desc: string; spots: number }

const EVENTS: Event[] = [
  {
    id: 'film',
    title: 'LOTR Maraton Gecesi',
    date: '7 Haziran 2026 — 20:00',
    desc: 'Yüzük Kardeşliği, iki kule ve kral\'ın dönüşü. Sınırsız cold brew eşliğinde 11 saatlik maraton.',
    spots: 20,
  },
  {
    id: 'tasting',
    title: 'Özel Çekirdek Tadımı',
    date: '14 Haziran 2026 — 11:00',
    desc: 'Dünya\'nın dört bir yanından gelen 6 farklı çekirdek. Barista rehberliğinde tadım notları ve aromaları keşfet.',
    spots: 12,
  },
  {
    id: 'hobbit',
    title: 'Hobbit Günü',
    date: '22 Eylül 2026 — 10:00',
    desc: 'Bilbo\'nun doğum günü şerefine özel Shire menüsü, kostüm yarışması ve "İkinci Kahvaltı" paketi.',
    spots: 40,
  },
]

export default function EventsSection() {
  return (
    <section id="events" className="section-padding bg-shire/10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-16"
        >
          Etkinlikler
        </motion.h2>

        <div className="flex flex-col gap-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="border border-grass/30 p-8 flex flex-col md:flex-row gap-6 items-start hover:border-gold/50 transition-colors duration-300"
            >
              <div className="flex-1">
                <p className="text-gold text-xs tracking-widest uppercase mb-2">{event.date}</p>
                <h3 className="font-display text-xl text-cream mb-3">{event.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{event.desc}</p>
                <p className="mt-3 text-grass text-xs">{event.spots} kontenjan</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="shrink-0 border border-gold text-gold px-6 py-2 font-display text-sm tracking-wider hover:bg-gold hover:text-forest transition-colors duration-200"
              >
                Kaydol
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run smoke test**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/EventsSection.tsx src/tests/smoke.test.tsx
git commit -m "feat: EventsSection with animated cards"
```

---

## Task 11: ContactSection + Footer

**Files:**
- Create: `src/components/ContactSection.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Add smoke tests**

```tsx
// append to src/tests/smoke.test.tsx
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

describe('ContactSection', () => {
  it('renders contact form', () => {
    render(<ContactSection />)
    expect(screen.getByRole('button', { name: /Gönder/i })).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Valinor Coffee/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/components/ContactSection.tsx`**

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    await fetch('/?no-cache=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
    setStatus('sent')
  }

  return (
    <section id="contact" className="section-padding bg-forest">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-16"
        >
          İletişim
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {[
              { label: 'Adres',  value: 'Örnek Mah. Tolkien Cad. No:1\nİstanbul, Türkiye' },
              { label: 'Saatler', value: 'Pzt–Cum: 08:00 – 22:00\nCmt–Paz: 09:00 – 23:00' },
              { label: 'Telefon', value: '+90 212 000 00 00' },
              { label: 'E-posta', value: 'merhaba@valinorcoffee.com' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.label}</p>
                <p className="text-cream/70 whitespace-pre-line">{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'sent' ? (
              <p className="text-gold font-display text-xl">
                Mesajın ulaştı. En geç bir iş günü içinde dönüş yaparız.
              </p>
            ) : (
              <form
                name="contact"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    Mesaj
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-gold text-gold py-3 font-display tracking-widest hover:bg-gold hover:text-forest transition-colors duration-200 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Gönderiliyor…' : 'Gönder'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 h-64 bg-shire/20 border border-grass/30 flex items-center justify-center">
          <span className="text-cream/30 font-display">Google Maps embed buraya</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Implement `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="bg-forest border-t border-grass/20 px-6 md:px-16 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-gold tracking-widest">Valinor Coffee</span>
        <nav className="flex gap-6 text-cream/50 text-sm">
          {['#menu', '#story', '#gallery', '#events', '#contact'].map((href) => (
            <a key={href} href={href} className="hover:text-gold transition-colors duration-200">
              {href.replace('#', '')}
            </a>
          ))}
        </nav>
        <p className="text-cream/30 text-xs">© 2026 Valinor Coffee. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Run smoke tests**

```bash
npx vitest run src/tests/smoke.test.tsx
```
Expected: PASS (all).

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactSection.tsx src/components/Footer.tsx src/tests/smoke.test.tsx
git commit -m "feat: ContactSection with Netlify form and Footer"
```

---

## Task 12: App.tsx Assembly

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Write `src/App.tsx`**

```tsx
import Navbar       from './components/Navbar'
import HeroSection  from './components/HeroSection'
import MenuSection  from './components/MenuSection'
import StorySection from './components/StorySection'
import GallerySection from './components/GallerySection'
import EventsSection  from './components/EventsSection'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <StorySection />
        <GallerySection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run all tests**

```bash
npx vitest run
```
Expected: All tests PASS.

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```
Open `http://localhost:3007`. Check:
- Video plays in hero, particles drift
- Scroll through all 6 sections
- Menu filter tabs work
- Gallery lightbox opens/closes
- Contact form fields render

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: assemble App.tsx with all sections"
```

---

## Task 13: Netlify Config + Deployment

**Files:**
- Create: `netlify.toml`
- Create: `.gitignore` update

- [ ] **Step 1: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/video/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- [ ] **Step 2: Verify `dist/` is in `.gitignore`** — open `.gitignore` and confirm `dist` is listed. If not, add it.

```bash
grep -q '^dist' .gitignore || echo 'dist' >> .gitignore
```

- [ ] **Step 3: Build for production**

```bash
npm run build
```
Expected: `dist/` folder, no TypeScript errors, no build warnings.

- [ ] **Step 4: Preview production build locally**

```bash
npx vite preview --port 3007
```
Open `http://localhost:3007`. Check video loads, particles render, no console errors.

- [ ] **Step 5: Commit**

```bash
git add netlify.toml .gitignore
git commit -m "feat: Netlify deployment config"
```

- [ ] **Step 6: Deploy to Netlify**

Either drag-and-drop the `dist/` folder to Netlify's manual deploy UI, or:

```bash
# If Netlify CLI installed:
npx netlify deploy --prod --dir dist
```

---

## Task 14: Systemd Service (local dev)

**Files:**
- Create: `~/.config/systemd/user/valinor.service`

- [ ] **Step 1: Create service file**

```ini
[Unit]
Description=Valinor Coffee dev server
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/claw/valinor-coffee
ExecStart=/usr/bin/npm run dev
Restart=on-failure
Environment=NODE_ENV=development

[Install]
WantedBy=default.target
```

- [ ] **Step 2: Enable and start**

```bash
systemctl --user daemon-reload
systemctl --user enable valinor.service
systemctl --user start valinor.service
systemctl --user status valinor.service
```
Expected: `active (running)`.

- [ ] **Step 3: Add to Cloudflare tunnel config**

Open `~/.cloudflared/config.yml` and add under `ingress` (before the catch-all rule):

```yaml
- hostname: valinor.pixelberry.co
  service: http://localhost:3007
```

- [ ] **Step 4: Restart tunnel**

```bash
systemctl --user restart cloudflared
```

- [ ] **Step 5: Update port memory**

Add to port assignments: `3007 | valinor-coffee | /home/claw/valinor-coffee | valinor.service`

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: finalize project — all sections, tests, Netlify config"
```
