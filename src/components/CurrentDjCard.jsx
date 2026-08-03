import { Clock3, MessageCircleHeart, Mic2, UserRound } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

function CurrentDjCard() {
  const hasWhatsapp = Boolean(RADIO_CONFIG.requestWhatsapp.trim())

  return (
    <section aria-labelledby="current-dj-title" className="border border-white/[0.09] bg-[#0e080a] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Yayındaki DJ</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="grid size-14 shrink-0 place-items-center border border-rose-300/15 bg-gradient-to-br from-rose-900/70 to-[#160a0f] text-rose-200"><UserRound size={26} aria-hidden="true" /></span>
        <div className="min-w-0">
          <h2 id="current-dj-title" className="truncate text-lg font-semibold text-white">{RADIO_CONFIG.currentDj.name}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-rose-200"><Mic2 size={14} aria-hidden="true" /> {RADIO_CONFIG.currentDj.show}</p>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 border-t border-white/[0.08] pt-3 text-xs leading-5 text-stone-400"><Clock3 size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> Yayın saatleri program akışında duyurulur.</p>
      {hasWhatsapp ? (
        <a href={RADIO_CONFIG.requestWhatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</a>
      ) : (
        <button type="button" disabled className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-stone-400"><MessageCircleHeart size={17} aria-hidden="true" /> Şarkı İste</button>
      )}
    </section>
  )
}

export default CurrentDjCard
