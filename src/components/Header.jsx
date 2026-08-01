import { LogIn, Menu, Radio, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

function Header({ onOpenSchedule, onOpenDjs }) {
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

  const closeMenu = () => setIsOpen(false)
  const openFromMenu = (openModal) => {
    closeMenu()
    openModal()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080406]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
          <span className="grid size-8 place-items-center bg-rose-700 text-white"><Radio size={17} aria-hidden="true" /></span>
          <span className="font-bold tracking-wide text-white">{RADIO_CONFIG.name}</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Ana menü">
          <a href="#canli-yayin" className="text-sm text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">Canlı Yayın</a>
          <button type="button" onClick={onOpenSchedule} className="text-sm text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">Yayın Akışı</button>
          <button type="button" onClick={onOpenDjs} className="text-sm text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">DJ Kadrosu</button>
          <a href="#hakkimizda" className="text-sm text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">Hakkımızda</a>
          <button type="button" disabled title="Üyelik sistemi yakında" className="inline-flex cursor-not-allowed items-center gap-2 border border-white/10 px-3 py-2 text-sm text-stone-500"><LogIn size={15} aria-hidden="true" /> Giriş Yap</button>
        </nav>

        <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={isOpen} aria-controls="mobile-menu" className="grid size-10 place-items-center border border-white/10 text-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 lg:hidden">
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] border-t border-white/[0.08] bg-[#080406] px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col" aria-label="Mobil menü">
            <a href="#canli-yayin" onClick={closeMenu} className="border-b border-white/[0.08] py-3.5 text-base text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-300">Canlı Yayın</a>
            <button type="button" onClick={() => openFromMenu(onOpenSchedule)} className="border-b border-white/[0.08] py-3.5 text-left text-base text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-300">Yayın Akışı</button>
            <button type="button" onClick={() => openFromMenu(onOpenDjs)} className="border-b border-white/[0.08] py-3.5 text-left text-base text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-300">DJ Kadrosu</button>
            <a href="#hakkimizda" onClick={closeMenu} className="border-b border-white/[0.08] py-3.5 text-base text-stone-200 focus-visible:outline-2 focus-visible:outline-amber-300">Hakkımızda</a>
            <button type="button" disabled className="mt-4 inline-flex cursor-not-allowed items-center justify-center gap-2 border border-white/10 px-4 py-3 text-stone-500"><LogIn size={17} aria-hidden="true" /> Giriş Yap · Yakında</button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
