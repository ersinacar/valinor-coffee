import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem { id: number; alt: string; aspect: 'tall' | 'wide' | 'square' }

const ITEMS: GalleryItem[] = [
  { id: 1, alt: 'Shire kahvaltısı',             aspect: 'tall'   },
  { id: 2, alt: 'Gandalf espresso',              aspect: 'square' },
  { id: 3, alt: 'Elvenkind dekorasyonu',         aspect: 'wide'   },
  { id: 4, alt: 'Hobbit kapısı detayı',          aspect: 'tall'   },
  { id: 5, alt: 'Mordor dark roast',             aspect: 'square' },
  { id: 6, alt: 'Mekân iç görünüş',             aspect: 'wide'   },
  { id: 7, alt: 'Barista kahve sanatı',          aspect: 'square' },
  { id: 8, alt: 'Kitaplık köşesi',              aspect: 'tall'   },
  { id: 9, alt: 'Rivendell cold brew hazırlığı', aspect: 'square' },
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
              <div className="absolute inset-0 flex items-end p-3 hover:bg-forest/40 transition-colors duration-300">
                <span className="text-xs text-cream/0 hover:text-cream/80 transition-colors duration-300">
                  {item.alt}
                </span>
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
              className="relative max-w-3xl w-full mx-6 bg-shire/20 aspect-video flex items-center justify-center border border-gold/20"
            >
              <span className="text-cream/50 font-display">{current.alt}</span>

              <button
                onClick={() => setSelected((s) => (s! > 0 ? s! - 1 : total - 1))}
                className="absolute left-3 text-gold text-2xl hover:scale-110 transition-transform"
                aria-label="Önceki"
              >
                ←
              </button>

              <button
                onClick={() => setSelected((s) => (s! < total - 1 ? s! + 1 : 0))}
                className="absolute right-3 text-gold text-2xl hover:scale-110 transition-transform"
                aria-label="Sonraki"
              >
                →
              </button>

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
