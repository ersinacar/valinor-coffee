import { motion } from 'framer-motion'

interface Review {
  name: string
  text: string
  stars: number
}

const REVIEWS: Review[] = [
  {
    name: 'Ahmet Y.',
    stars: 5,
    text: "Diyarbakır'da nitelikli kahve içebileceğiniz harika bir mekan. Özellikle V60 demlemeleri çok başarılı, kahve çekirdeklerinin kalitesi kendini belli ediyor. Orta Dünya temalı modern dekorasyonu ve sakin atmosferi de cabası. Kesinlikle tavsiye ederim.",
  },
  {
    name: 'Elif K.',
    stars: 5,
    text: 'Tasarımıyla ve konseptiyle bölgedeki diğer kahvecilerden ayrışıyor. Hem çalışmak hem de arkadaşlarınızla nitelikli kahve eşliğinde sohbet etmek için çok ideal bir ortam. Çalışanlar ilgili ve kahve konusunda bilgililer.',
  },
  {
    name: 'Caner M.',
    stars: 5,
    text: 'Harika bir kahve deneyimi! Çekirdeklerin orijini ve kavrum kalitesi üst düzeyde. Mekanın modern çizgileri ile sıcak atmosferi birleşince ortaya çok keyifli bir konsept çıkmış. Favori mekanlarımdan biri oldu.',
  },
  {
    name: 'Zeynep A.',
    stars: 5,
    text: 'Sakin, nitelikli ve özgün bir yer arıyorsanız doğru adres. Espresso bazlı içecekleri de filtre kahveleri de oldukça dengeli ve lezzetli. Güler yüzlü hizmet ve kaliteli müzikler için teşekkürler.',
  },
  {
    name: 'Murat B.',
    stars: 5,
    text: "Mekan tasarımı, kahvelerin aroması ve sunum kalitesi gerçekten çok başarılı. Diyarbakır'da üçüncü nesil kahve kültürünü hakkıyla yaşatan nadir yerlerden biri.",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-gold text-sm" aria-label={`${count} yıldız`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding bg-shire/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-4"
        >
          Müşteri Yorumları
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Stars count={5} />
          <span className="text-cream/60 text-sm tracking-wide">4.9 / 5</span>
          <span className="text-cream/30 text-xs">·</span>
          <a
            href="https://www.google.com/maps/place/Valinor+Coffee/@37.9447754,40.1605911,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cream/40 hover:text-gold text-xs tracking-wider transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
            </svg>
            Google Yorumları
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border border-grass/30 p-6 hover:border-gold/40 transition-colors duration-300 flex flex-col gap-4"
            >
              <Stars count={review.stars} />
              <p className="text-cream/70 text-sm leading-relaxed flex-1">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-gold font-display text-sm tracking-wider">— {review.name}</span>
                <a
                  href="https://www.google.com/maps/place/Valinor+Coffee/@37.9447754,40.1605911,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/20 hover:text-cream/50 transition-colors duration-200"
                  aria-label="Google'da görüntüle"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
