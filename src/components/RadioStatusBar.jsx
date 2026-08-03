import { Headphones, Mic2, Music2, Users } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

function RadioStatusBar() {
  return (
    <section aria-label="Radyo durumu" className="border-x border-b border-white/[0.08] bg-[#10080b] px-4 py-3 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr_1fr] lg:items-center">
        <div className="flex items-center gap-3"><Mic2 size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Yayındaki DJ</p><p className="text-sm font-semibold text-white">{RADIO_CONFIG.currentDj.name}</p></div></div>
        <div className="flex items-center gap-3"><Music2 size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Çalan şarkı</p><p className="text-sm text-stone-300">Canlı oynatıcıda gösterilir</p></div></div>
        <div className="flex items-center gap-3"><Headphones size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Yayın durumu</p><p className="text-sm text-stone-300">Oynatıcıdan kontrol edin</p></div></div>
        <div className="flex items-center gap-3"><Users size={17} className="text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Sohbet</p><p className="text-sm text-stone-300">Sayaç oda panelinde</p></div></div>
      </div>
    </section>
  )
}

export default RadioStatusBar
