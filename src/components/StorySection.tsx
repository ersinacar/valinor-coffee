import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" ref={ref} className="section-padding bg-shire/20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

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
            "Valinor Coffee, Tolkien'in eserlerinden ilham alarak kurulmuş bir kahve atelyesidir. Her içeceğimiz, Orta Dünya'nın farklı bir köşesinden taşınan bir özü yansıtır.",
            "Hobbit'lerin sofrasındaki sıcaklıkla hazırlanan kahvelerimiz, her yudumda sizi derin ormanlara, karlı dağların eteklerine ve altın tarlalara götürür.",
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

        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 bg-gradient-to-br from-[#1a2e1a] via-[#2a3d1a] to-[#0d1a0d] flex items-center justify-center"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 opacity-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" stroke="#C8A84B" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" stroke="#C8A84B" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" stroke="#C8A84B" strokeWidth="0.5" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="#C8A84B" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#C8A84B" strokeWidth="0.5" />
              <line x1="43" y1="43" x2="157" y2="157" stroke="#C8A84B" strokeWidth="0.5" />
              <line x1="157" y1="43" x2="43" y2="157" stroke="#C8A84B" strokeWidth="0.5" />
              <polygon points="100,30 170,150 30,150" stroke="#C8A84B" strokeWidth="0.5" fill="none" />
              <circle cx="100" cy="100" r="8" fill="#C8A84B" fillOpacity="0.3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
            <p className="absolute bottom-6 left-6 text-gold/40 font-display text-sm tracking-[0.3em] uppercase">
              Valinor Coffee
            </p>
          </motion.div>
          <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
