# Valinor Coffee — Design Spec

**Date:** 2026-05-22  
**Status:** Approved  
**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + Three.js + Framer Motion  
**Deploy:** Netlify  
**Local port:** 3007

---

## 1. Overview

Valinor Coffee is a single-page marketing website for a Lord of the Rings themed coffee shop. The site communicates warmth, craft, and fantasy through the "Shire" visual aesthetic: deep greens, gold, and amber tones. The hero section is the centrepiece — a Valinor video background with a Three.js particle overlay that reacts to mouse movement.

---

## 2. Visual Direction

**Theme:** The Shire — cosy, earthy, inviting. Warm greens and golds, not dramatic dark tones.

**Colour palette:**

| Token | Hex | Usage |
|---|---|---|
| `forest` | `#0d1a07` | Deep background |
| `shire` | `#2d5016` | Primary sections |
| `grass` | `#4a7c2f` | Accents, borders |
| `coffee` | `#8b6914` | Secondary accent |
| `gold` | `#c8a84b` | Headings, highlights |
| `cream` | `#f5e6a3` | Body text on dark bg |

**Typography:** Serif display font (e.g. Cinzel or IM Fell English) for headings; clean sans-serif (Inter) for body.

---

## 3. Page Structure

Single-page scroll. Six sections in order:

### 3.1 Hero (`100vh`)
- **Background:** `<video>` element, `object-fit: cover`, autoplay muted loop. Source: a Valinor-themed cinematic clip (user-supplied, stored in `public/video/`).
- **Overlay:** Three.js `<Canvas>` positioned absolutely over the video. Renders 300–500 gold/amber particles that drift slowly and scatter away from the mouse cursor (repulsion within ~100px radius). Implemented with `@react-three/fiber` + custom shader or Points geometry.
- **Foreground:** Centred flex column — logo, tagline, CTA button ("Keşfet ↓"). Framer Motion `fadeInUp` stagger on mount.
- **Navbar:** Sticky, transparent at top, darkens with backdrop-blur on scroll.

### 3.2 Menu
- Grid of coffee cards. Each card: name (LOTR-themed), description, price.
- Placeholder items: Gandalf Espresso, Shire Latte, Rivendell Cold Brew, Mordor Dark Roast, Frodo Flat White, Aragorn Americano.
- Category filter tabs (Espresso, Latte, Cold Brew, Seasonal) — filters cards with Framer Motion `AnimatePresence`.
- Cards animate in with `whileInView` stagger as section enters viewport.

### 3.3 Hikayemiz (Story)
- Two-column layout (text left, image right) on desktop; stacked on mobile.
- Parallax: image moves at 0.5x scroll speed via Framer Motion `useScroll` + `useTransform`.
- Text reveals line-by-line with `whileInView`.

### 3.4 Galeri (Gallery)
- CSS masonry grid (3 columns desktop, 2 tablet, 1 mobile).
- Placeholder: 9–12 images from `public/gallery/`. Alt text describing LOTR/coffee scenes.
- Hover: scale(1.03) + brightness overlay with Framer Motion `whileHover`.
- Lightbox: clicking an image opens a full-screen overlay with prev/next navigation.

### 3.5 Etkinlikler (Events)
- Vertical list of event cards. Each card: title, date, description, "Kaydol" button.
- Placeholder events: Film Gecesi, Özel Tadım, Tema Günü.
- Cards slide in from left with `whileInView`.

### 3.6 İletişim & Footer (Contact)
- Two columns: left = address/hours/phone/email; right = Netlify Forms contact form (name, email, message, submit).
- Google Maps `<iframe>` embed below the two columns.
- Footer below: logo, nav links, copyright.

---

## 4. Component Architecture

```
src/
  components/
    Navbar.tsx            — sticky, blur-on-scroll
    HeroSection.tsx       — video bg + Three.js canvas + foreground text
    MenuSection.tsx       — category filter + card grid
    StorySection.tsx      — parallax two-column
    GallerySection.tsx    — masonry + lightbox
    EventsSection.tsx     — event card list
    ContactSection.tsx    — Netlify form + map
    Footer.tsx
  three/
    ParticleOverlay.tsx   — @react-three/fiber canvas, mouse-reactive particles
  hooks/
    useMousePosition.ts   — normalised mouse coords for Three.js
  App.tsx                 — renders sections in order
  main.tsx
  index.css               — Tailwind directives + CSS custom properties
```

---

## 5. Animations

| Element | Trigger | Effect |
|---|---|---|
| Hero text / CTA | Mount | `fadeInUp` stagger, 0.2s delay each |
| Particles | Continuous | Drift + mouse repulsion |
| Menu cards | `whileInView` | `fadeInUp` stagger |
| Story image | Scroll | Parallax (0.5x speed) |
| Gallery items | `whileHover` | Scale 1.03 + brightness |
| Event cards | `whileInView` | SlideInLeft |
| Navbar | Scroll > 50px | Background fade-in + backdrop-blur |

All `whileInView` animations use `once: true` (trigger once, not on re-entry).

---

## 6. Three.js Particle System

- **Library:** `@react-three/fiber` + `@react-three/drei`
- **Geometry:** `<Points>` with `BufferGeometry`, 400 particles
- **Material:** `PointsMaterial`, size 0.015, colour `#c8a84b` (gold), transparent with slight opacity variation per particle
- **Behaviour:** Each particle has a random drift velocity; on each frame, particles within 100px of the mouse cursor are pushed away (repulsion vector). Returns to base position slowly (lerp).
- **Canvas:** `position: absolute`, `pointer-events: none`, covers full hero section, z-index above video but below foreground text.

---

## 7. Netlify Deploy

- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` at root:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  ```
- Netlify Forms: Vite produces a CSR app — Netlify's crawler can't find forms in JS bundles. Solution: add a hidden static copy of the form in `index.html` (inside `<body>`) with `netlify` attribute. The React form POSTs with `fetch` to `/?no-cache=1` (Netlify Forms endpoint). This pattern is reliable for all React SPA builds.
- No SSR, no functions needed.

---

## 8. Content (Placeholder)

Real content (video file, gallery photos, actual menu items, address, event dates) to be supplied by user and dropped into `public/`. Site built with realistic placeholder data so layout is immediately visible.

---

## 9. Out of Scope

- CMS integration
- Online ordering / e-commerce
- Authentication
- Blog
- Multi-language
