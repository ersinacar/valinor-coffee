import { motion } from 'framer-motion'

interface Event { id: string; title: string; date: string; desc: string; spots: number }

const EVENTS: Event[] = [
  {
    id: 'film',
    title: 'LOTR Maraton Gecesi',
    date: '7 Haziran 2026 — 20:00',
    desc: "Yüzük Kardeşliği, iki kule ve kral'ın dönüşü. Sınırsız cold brew eşliğinde 11 saatlik maraton.",
    spots: 20,
  },
  {
    id: 'tasting',
    title: 'Özel Çekirdek Tadımı',
    date: '14 Haziran 2026 — 11:00',
    desc: "Dünya'nın dört bir yanından gelen 6 farklı çekirdek. Barista rehberliğinde tadım notları ve aromaları keşfet.",
    spots: 12,
  },
  {
    id: 'hobbit',
    title: 'Hobbit Günü',
    date: '22 Eylül 2026 — 10:00',
    desc: "Bilbo'nun doğum günü şerefine özel Shire menüsü, kostüm yarışması ve \"İkinci Kahvaltı\" paketi.",
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
              className="border border-grass/30 p-5 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-start hover:border-gold/50 transition-colors duration-300"
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
                className="shrink-0 w-full md:w-auto text-center border border-gold text-gold px-6 py-2 font-display text-sm tracking-wider hover:bg-gold hover:text-forest transition-colors duration-200"
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
