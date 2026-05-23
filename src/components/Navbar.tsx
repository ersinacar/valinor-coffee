import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Menü',      href: '#menu'    },
  { label: 'Hikayemiz', href: '#story'   },
  { label: 'Galeri',    href: '#gallery' },
  { label: 'Etkinlikler', href: '#events' },
  { label: 'İletişim',  href: '#contact' },
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
