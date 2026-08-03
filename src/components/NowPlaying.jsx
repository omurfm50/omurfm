import { MessageCircle, Radio, UserRound } from 'lucide-react'
import { useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'
import SectionTitle from './SectionTitle.jsx'

function NowPlaying() {
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = Boolean(RADIO_CONFIG.currentDj.image.trim()) && !imageFailed
  const hasWhatsapp = Boolean(RADIO_CONFIG.requestWhatsapp.trim())

  return (
    <section id="yayin-bilgisi" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Canlı Stüdyo" title="Ömür FM Canlı Yayın" description="Çalan şarkı ve yayın durumu canlı oynatıcı üzerinde gösterilir." align="left" />
        <div className="mt-10 grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#210a11] to-[#10080b] p-5 shadow-xl shadow-black/20 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid size-28 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-900/70 to-stone-900 text-rose-200 sm:size-32">
            {hasImage ? (
              <img src={RADIO_CONFIG.currentDj.image} alt={`${RADIO_CONFIG.currentDj.name} profil görseli`} onError={() => setImageFailed(true)} className="size-full object-cover" />
            ) : (
              <UserRound size={44} strokeWidth={1.25} aria-hidden="true" />
            )}
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold text-stone-300">
              <Radio size={13} aria-hidden="true" /> ÖMÜR FM CANLI YAYIN
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">DJ: {RADIO_CONFIG.currentDj.name}</h3>
            <p className="mt-1 text-rose-200">{RADIO_CONFIG.currentDj.show}</p>
            <p className="mt-3 text-sm leading-6 text-stone-400">Çalan şarkı bilgisi için yukarıdaki canlı oynatıcıyı kontrol edin.</p>
          </div>
          {hasWhatsapp ? (
            <a href={RADIO_CONFIG.requestWhatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              <MessageCircle size={18} aria-hidden="true" /> İstek Gönder
            </a>
          ) : (
            <button type="button" disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 font-semibold text-stone-400">
              <MessageCircle size={18} aria-hidden="true" /> İstek Gönder
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default NowPlaying
