export default function Footer() {
  return (
    <footer className="bg-forest border-t border-grass/20 px-6 md:px-16 pt-10 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <span className="font-display text-gold tracking-widest text-lg">Valinor Coffee</span>
            <p className="text-cream/50 text-sm mt-3 leading-relaxed max-w-xs">
              Çetin Durmaz Rezidansları<br />
              Mezopotamya Mah. Mahabad Bulvarı<br />
              75 Metrelik Yol Üstü Azel, D:2. Etap B/Blok No 41:BB<br />
              21070 Kayapınar / Diyarbakır
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-cream/50 text-sm">
            <span className="text-cream/30 text-xs uppercase tracking-widest mb-1">Menü</span>
            {[
              { href: '#menu',    label: 'Menü' },
              { href: '#story',   label: 'Hikayemiz' },
              { href: '#gallery', label: 'Galeri' },
              { href: '#events',  label: 'Etkinlikler' },
              { href: '#contact', label: 'İletişim' },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-gold transition-colors duration-200">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-grass/20 pt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">© 2026 Valinor Coffee. Tüm hakları saklıdır.</p>
          <a href="https://pixelberry.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 opacity-25 hover:opacity-60 transition-opacity duration-300">
            <img src="/pixelberry-logo.svg" alt="Pixelberry" className="h-5 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  )
}
