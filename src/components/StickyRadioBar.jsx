import { MessageCircleHeart, Radio } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'
import CasterWidget from './CasterWidget.jsx'
import RadioPlayer from './RadioPlayer.jsx'

function StickyRadioBar() {
  const hasStream = Boolean(RADIO_CONFIG.streamUrl.trim())
  const hasWhatsapp = Boolean(RADIO_CONFIG.requestWhatsapp.trim())

  return (
    <section id="canli-yayin" aria-label="Canlı yayın oynatıcısı" className="scroll-mt-20 pb-5 md:sticky md:bottom-0 md:z-40">
      <div className="grid gap-3 border border-rose-300/15 bg-[#10070a]/95 p-3 shadow-[0_-14px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:grid-cols-[170px_minmax(0,1fr)_150px] md:items-center">
        <div className="flex items-center gap-3 px-1">
          <span className="grid size-10 shrink-0 place-items-center bg-rose-700 text-white"><Radio size={19} aria-hidden="true" /></span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{RADIO_CONFIG.name}</p><p className="truncate text-xs text-stone-400">{RADIO_CONFIG.currentDj.name} · Canlı Yayın</p></div>
        </div>
        <div className="min-w-0">
          {hasStream ? <RadioPlayer /> : <CasterWidget />}
        </div>
        {hasWhatsapp ? (
          <a href={RADIO_CONFIG.requestWhatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</a>
        ) : (
          <button type="button" disabled className="flex cursor-not-allowed items-center justify-center gap-2 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-stone-400"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</button>
        )}
      </div>
    </section>
  )
}

export default StickyRadioBar
