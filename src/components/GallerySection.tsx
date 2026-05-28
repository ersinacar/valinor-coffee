import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem { id: number; alt: string; aspect: 'tall' | 'wide' | 'square'; gradient: string; icon: string }

const ITEMS: GalleryItem[] = [
  { id: 1, alt: 'Shire kahvaltısı',             aspect: 'tall',   gradient: 'from-[#2a3d1a] to-[#1a2e1a]', icon: '☕' },
  { id: 2, alt: 'Gandalf espresso',              aspect: 'square', gradient: 'from-[#1a1a0d] to-[#2a2a0d]', icon: '✦' },
  { id: 3, alt: 'Elvenkind dekorasyonu',         aspect: 'wide',   gradient: 'from-[#1a2a2a] to-[#0d1a2a]', icon: '⬡' },
  { id: 4, alt: 'Hobbit kapısı detayı',          aspect: 'tall',   gradient: 'from-[#2a1a0d] to-[#1a0d0d]', icon: '◎' },
  { id: 5, alt: 'Mordor dark roast',             aspect: 'square', gradient: 'from-[#1a0d0d] to-[#0d0d0d]', icon: '◉' },
  { id: 6, alt: 'Mekân iç görünüş',             aspect: 'wide',   gradient: 'from-[#1a2e1a] to-[#2a3d2a]', icon: '⬟' },
  { id: 7, alt: 'Barista kahve sanatı',          aspect: 'square', gradient: 'from-[#2a1a2a] to-[#1a0d1a]', icon: '✧' },
  { id: 8, alt: 'Kitaplık köşesi',              aspect: 'tall',   gradient: 'from-[#1a1a2a] to-[#0d0d1a]', icon: '⬢' },
  { id: 9, alt: 'Rivendell cold brew hazırlığı', aspect: 'square', gradient: 'from-[#0d2a1a] to-[#1a3d2a]', icon: '◈' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[150px] md:auto-rows-[200px] gap-2 md:gap-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(i)}
              className={`bg-gradient-to-br ${item.gradient} cursor-pointer overflow-hidden relative group border border-gold/5 hover:border-gold/25 transition-colors duration-300 ${ASPECT_CLASS[item.aspect]}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gold/20 text-3xl group-hover:text-gold/40 transition-all duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-xs text-cream/70 tracking-wider">{item.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              className={`relative max-w-3xl w-full mx-6 aspect-video bg-gradient-to-br ${current.gradient} flex flex-col items-center justify-center border border-gold/20`}
            >
              <span className="text-gold/30 text-6xl mb-4">{current.icon}</span>
              <span className="text-cream/50 font-display text-sm tracking-widest">{current.alt}</span>

              <button
                onClick={() => setSelected((s) => (s! > 0 ? s! - 1 : total - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gold text-2xl hover:scale-110 transition-transform p-4"
                aria-label="Önceki"
              >
                ←
              </button>

              <button
                onClick={() => setSelected((s) => (s! < total - 1 ? s! + 1 : 0))}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gold text-2xl hover:scale-110 transition-transform p-4"
                aria-label="Sonraki"
              >
                →
              </button>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-0 right-0 text-cream/60 hover:text-gold text-xl p-4"
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
