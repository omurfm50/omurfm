import { Headphones, MessageCircleHeart, Mic2, Music2, Users } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

function RadioStatusBar() {
  const hasWhatsapp = Boolean(RADIO_CONFIG.requestWhatsapp.trim())

  return (
    <section aria-label="Radyo durumu" className="border-x border-b border-white/[0.08] bg-[#10080b] px-4 py-3 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1fr_auto] lg:items-center">
        <div className="flex items-center gap-3"><Mic2 size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Yayındaki DJ</p><p className="text-sm font-semibold text-white">{RADIO_CONFIG.currentDj.name}</p></div></div>
        <div className="flex items-center gap-3"><Music2 size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Çalan şarkı</p><p className="text-sm text-stone-300">Canlı oynatıcıda gösterilir</p></div></div>
        <div className="flex items-center gap-3"><Headphones size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Yayın durumu</p><p className="text-sm text-stone-300">Oynatıcıdan kontrol edin</p></div></div>
        <div className="flex items-center gap-3"><Users size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Sohbet</p><p className="text-sm text-stone-300">Sayaç oda panelinde</p></div></div>
        {hasWhatsapp ? (
          <a href={RADIO_CONFIG.requestWhatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</a>
        ) : (
          <button type="button" disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-stone-400"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</button>
        )}
      </div>
    </section>
  )
}

export default RadioStatusBar
