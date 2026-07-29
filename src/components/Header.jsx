import { useEffect, useState } from 'react'
import { Headphones, Menu, Radio, X } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

const NAV_ITEMS = [
  { label: 'Ana Sayfa', href: '#ana-sayfa' },
  { label: 'Canlı Yayın', href: '#canli-yayin' },
  { label: 'DJ Kadrosu', href: '#dj-kadrosu' },
  { label: 'Yayın Akışı', href: '#yayin-akisi' },
  { label: 'Sohbet', href: '#sohbet' },
  { label: 'İletişim', href: '#iletisim' },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0608]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#ana-sayfa" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
          <span className="grid size-10 place-items-center rounded-xl border border-amber-300/30 bg-gradient-to-br from-rose-700 to-[#380914] shadow-lg shadow-rose-950/50">
            <Radio size={20} aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-wide text-white">{RADIO_CONFIG.name}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana menü">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#canli-yayin" className="hidden items-center gap-2 rounded-full bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/40 transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:flex">
            <Headphones size={17} aria-hidden="true" />
            Canlı Dinle
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 lg:hidden"
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-18 h-[calc(100vh-4.5rem)] border-t border-white/10 bg-[#0b0608] px-5 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Mobil menü">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-white/10 py-4 text-lg text-stone-200 transition hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-amber-300">
                {item.label}
              </a>
            ))}
            <a href="#canli-yayin" onClick={() => setIsOpen(false)} className="mt-6 flex items-center justify-center gap-2 rounded-full bg-rose-700 px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              <Headphones size={18} aria-hidden="true" />
              Canlı Dinle
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
