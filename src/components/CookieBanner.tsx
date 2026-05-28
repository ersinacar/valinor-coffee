import { useState, useEffect } from 'react'

const KEY = 'valinor_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true)
  }, [])

  function accept() { localStorage.setItem(KEY, 'accepted'); setVisible(false) }
  function decline() { localStorage.setItem(KEY, 'declined'); setVisible(false) }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-6
                 bg-stone-900 text-stone-100 px-6 py-4 rounded-xl shadow-2xl
                 max-w-2xl w-[calc(100%-2rem)]
                 animate-slideUp"
    >
      <p className="flex-1 text-sm leading-relaxed text-stone-300 m-0">
        Bu site deneyiminizi geliştirmek için çerezler kullanır.{' '}
        <strong className="text-stone-100 font-semibold">KVKK</strong> ve{' '}
        <strong className="text-stone-100 font-semibold">GDPR</strong> kapsamında tercihlerinizi belirleyebilirsiniz.
      </p>
      <div className="flex gap-2.5 flex-shrink-0">
        <button
          onClick={decline}
          className="cursor-pointer border border-stone-600 bg-transparent text-stone-300 text-sm font-semibold px-4 py-2 rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Reddet
        </button>
        <button
          onClick={accept}
          className="cursor-pointer bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-85 transition-opacity whitespace-nowrap"
        >
          Kabul Et
        </button>
      </div>
    </div>
  )
}
