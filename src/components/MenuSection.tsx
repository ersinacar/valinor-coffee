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
  { id: 'gandalf',   name: 'Gandalf Espresso',     desc: 'Derin, güçlü, akıllıca — tek shot yeter.',          price: '₺65', category: 'Espresso'  },
  { id: 'aragorn',   name: 'Aragorn Americano',     desc: 'Uzun yolculuklara dayanır, soğumaz.',               price: '₺70', category: 'Espresso'  },
  { id: 'shire',     name: 'Shire Latte',           desc: 'Sütlü, yumuşak, Hobbiton gibi huzurlu.',            price: '₺80', category: 'Latte'     },
  { id: 'frodo',     name: 'Frodo Flat White',      desc: 'Küçük ama cesur. Yük taşır.',                       price: '₺80', category: 'Latte'     },
  { id: 'arwen',     name: 'Arwen Lavanta Latte',   desc: 'Elfçe bir lütuf, mor çiçek kokusu.',                price: '₺90', category: 'Latte'     },
  { id: 'cold',      name: 'Rivendell Cold Brew',   desc: '24 saat demlenir, ebediyet gibi soğuk.',            price: '₺95', category: 'Cold Brew' },
  { id: 'mordor',    name: 'Mordor Dark Roast',     desc: 'Uçurumun tam kavurması. Zayıf olanlar için değil.', price: '₺75', category: 'Espresso'  },
  { id: 'galadriel', name: 'Galadriel Matcha',      desc: "Lothlórien ormanından gelir, yeşil ve saf.",        price: '₺95', category: 'Seasonal'  },
  { id: 'merry',     name: 'Merry Pumpkin Spice',   desc: 'Sonbahar kampanyası — Hvite Dağlar baharatı.',      price: '₺90', category: 'Seasonal'  },
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
                className="border border-grass/30 p-6 hover:border-gold/60 transition-colors duration-300"
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
