import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    await fetch('/?no-cache=1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
    setStatus('sent')
  }

  return (
    <section id="contact" className="section-padding bg-forest">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl text-gold text-center mb-16"
        >
          İletişim
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {[
              { label: 'Adres',   value: 'Çetin Durmaz Rezidansları\nMezopotamya Mah. Mahabad Bulvarı\n75 Metrelik Yol Üstü Azel, D:2. Etap B/Blok No 41:BB\n21070 Kayapınar / Diyarbakır' },
              { label: 'Saatler', value: 'Pzt–Cum: 08:00 – 22:00\nCmt–Paz: 09:00 – 23:00' },
              { label: 'Telefon', value: '+90 212 000 00 00' },
              { label: 'E-posta', value: 'merhaba@valinorcoffee.com' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.label}</p>
                <p className="text-cream/70 whitespace-pre-line">{item.value}</p>
              </div>
            ))}

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'sent' ? (
              <p className="text-gold font-display text-xl">
                Mesajın ulaştı. En geç bir iş günü içinde dönüş yaparız.
              </p>
            ) : (
              <form name="contact" onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-xs tracking-widest uppercase mb-2">
                    Mesaj
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border border-grass/40 text-cream px-4 py-3 focus:border-gold outline-none transition-colors duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full border border-gold text-gold py-3 font-display tracking-widest hover:bg-gold hover:text-forest transition-colors duration-200 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Gönderiliyor…' : 'Gönder'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d40.1605911!3d37.9447754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751f6e284106b5%3A0x7fc96abbbf7e965a!2sValinor%20Coffee!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="256"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  )
}
