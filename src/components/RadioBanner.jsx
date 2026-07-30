import { Heart, Mic2, Music2, Radio, Sparkles } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useRadioMetadata } from '../hooks/useNowPlaying.js'

function RadioBanner() {
  const { currentDj } = useRadioMetadata()

  return (
    <section id="top" aria-labelledby="radio-banner-title" className="relative min-h-[220px] overflow-hidden border-x border-b border-white/[0.08] bg-[#19070d] sm:min-h-[250px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(225,29,72,0.25),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(251,191,36,0.09),transparent_24%),linear-gradient(120deg,rgba(0,0,0,0.15),rgba(69,10,29,0.5),rgba(0,0,0,0.45))]" />
      <Heart className="pointer-events-none absolute -left-6 bottom-0 size-40 -rotate-12 text-rose-300/[0.06]" strokeWidth={0.8} aria-hidden="true" />
      <Music2 className="pointer-events-none absolute right-[9%] top-8 size-20 rotate-12 text-amber-200/[0.08]" strokeWidth={0.8} aria-hidden="true" />
      <Sparkles className="pointer-events-none absolute left-[48%] top-9 text-rose-200/15" aria-hidden="true" />

      <div className="relative grid min-h-[220px] items-center gap-6 px-5 py-8 sm:min-h-[250px] sm:px-8 md:grid-cols-[1fr_auto] lg:px-12">
        <div>
          <div className="inline-flex items-center gap-2 border border-rose-300/20 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-rose-200">
            <Radio size={14} aria-hidden="true" /> Canlı internet radyosu
          </div>
          <h1 id="radio-banner-title" className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">ÖMÜR <span className="text-rose-400">FM</span></h1>
          <p className="mt-2 text-base text-stone-300 sm:text-lg">{RADIO_CONFIG.slogan}</p>
        </div>

        <div className="flex items-center gap-4 border-l-2 border-rose-500/60 bg-black/20 px-4 py-3 backdrop-blur-sm sm:min-w-64">
          <span className="grid size-12 shrink-0 place-items-center border border-white/10 bg-rose-900/50 text-rose-200"><Mic2 size={23} aria-hidden="true" /></span>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Yayındaki DJ</p>
            <p className="mt-1 font-semibold text-white">{currentDj}</p>
            <p className="text-sm text-stone-400">{RADIO_CONFIG.currentDj.show}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RadioBanner
