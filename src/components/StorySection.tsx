import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" ref={ref} className="section-padding bg-shire/20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

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
