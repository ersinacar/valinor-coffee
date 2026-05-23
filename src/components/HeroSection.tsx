import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import ParticleOverlay from '../three/ParticleOverlay'

const TAGLINE_WORDS = ['Orta', "Dünya'nın", 'En', 'İyi', 'Kahvesi']

export default function HeroSection() {
  const mouse = useMousePosition()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        style={{ zIndex: 0 }}
      />

      <div className="absolute inset-0 bg-forest/50" style={{ zIndex: 1 }} />

      <ParticleOverlay mouseX={mouse.x} mouseY={mouse.y} />

      <div
        className="absolute pointer-events-none"
        style={{ zIndex: 10, top: '32%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <motion.img
          src="/thelogo.png"
          alt="Valinor Coffee"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 9, duration: 2.5, ease: 'easeOut' }}
          className="w-20 md:w-28"
          style={{ filter: 'drop-shadow(0 0 20px rgba(200,168,75,0.4))' }}
        />
      </div>

      <div className="absolute bottom-24 z-10 w-full text-center px-6 flex flex-col items-center gap-5">
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
