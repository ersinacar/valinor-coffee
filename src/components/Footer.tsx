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

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/valinor.coffee/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/30 hover:text-gold transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://pixelberry.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 opacity-25 hover:opacity-60 transition-opacity duration-300">
              <img src="/pixelberry-logo.svg" alt="Pixelberry" className="h-5 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
