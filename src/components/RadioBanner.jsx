import { Heart, Headphones, Mic2, Music2, Radio, Sparkles } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useRadioMetadata } from '../hooks/useNowPlaying.js'

function RadioBanner() {
  const { currentDj } = useRadioMetadata()

  return (
    <section id="top" aria-labelledby="radio-banner-title" className="relative min-h-[220px] overflow-hidden border-x border-b border-white/[0.08] bg-[#19070d] sm:min-h-[250px] md:min-h-[300px] md:border-white/[0.1] md:bg-[#16070c]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(225,29,72,0.25),transparent_28%),radial-gradient(circle_at_82%_55%,rgba(251,191,36,0.09),transparent_24%),linear-gradient(120deg,rgba(0,0,0,0.15),rgba(69,10,29,0.5),rgba(0,0,0,0.45))] md:bg-[radial-gradient(circle_at_18%_45%,rgba(225,29,72,0.27),transparent_32%),radial-gradient(circle_at_78%_50%,rgba(245,158,11,0.12),transparent_25%),linear-gradient(112deg,rgba(0,0,0,0.08),rgba(69,10,29,0.44)_52%,rgba(0,0,0,0.55))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent md:block" />
      <div className="pointer-events-none absolute -left-24 top-1/2 hidden size-72 -translate-y-1/2 rounded-full border border-rose-300/[0.08] md:block" />
      <div className="pointer-events-none absolute -left-12 top-1/2 hidden size-48 -translate-y-1/2 rounded-full border border-rose-300/[0.08] md:block" />
      <Heart className="pointer-events-none absolute -left-6 bottom-0 size-40 -rotate-12 text-rose-300/[0.06] md:left-[44%] md:bottom-[-3rem] md:size-52 md:text-rose-200/[0.035]" strokeWidth={0.8} aria-hidden="true" />
      <Music2 className="pointer-events-none absolute right-[9%] top-8 size-20 rotate-12 text-amber-200/[0.08] md:right-[4%] md:top-5 md:size-24 md:text-amber-200/[0.055]" strokeWidth={0.8} aria-hidden="true" />
      <Sparkles className="pointer-events-none absolute left-[48%] top-9 text-rose-200/15 md:left-[51%] md:top-12 md:size-7" aria-hidden="true" />

      <div className="relative grid min-h-[220px] items-center gap-6 px-5 py-8 sm:min-h-[250px] sm:px-8 md:min-h-[300px] md:grid-cols-[minmax(0,1fr)_20rem] md:gap-12 md:px-12 md:py-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-16">
        <div>
          <div className="inline-flex items-center gap-2 border border-rose-300/20 bg-black/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-rose-200 md:rounded-full md:border-rose-300/25 md:bg-rose-950/30 md:px-4 md:py-2 md:text-[11px]">
            <span className="relative hidden size-2 md:inline-flex">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-rose-400" />
            </span>
            <Radio className="md:hidden" size={14} aria-hidden="true" /> Canlı internet radyosu
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <h1 id="radio-banner-title" className="shrink-0 text-3xl font-black tracking-normal text-white sm:text-5xl md:text-6xl md:leading-none md:tracking-[-0.045em] lg:text-7xl">ÖMÜR <span className="text-rose-400 md:bg-gradient-to-br md:from-rose-300 md:via-rose-400 md:to-pink-600 md:bg-clip-text md:text-transparent">FM</span></h1>
            <div className="min-w-0 border-l-2 border-rose-500/60 pl-3 sm:hidden">
              <p className="text-[9px] font-semibold uppercase tracking-normal text-amber-200">Yayındaki DJ</p>
              <p className="mt-1 truncate text-sm font-semibold text-white">{currentDj}</p>
              <p className="truncate text-xs text-stone-400">{RADIO_CONFIG.currentDj.show}</p>
            </div>
          </div>
          <p className="mt-2 text-base text-stone-300 sm:text-lg md:mt-4 md:text-xl md:font-light md:tracking-wide md:text-stone-200">{RADIO_CONFIG.slogan}</p>
          <div className="mt-7 hidden items-center gap-5 text-xs font-medium uppercase tracking-[0.16em] text-stone-400 md:flex">
            <span className="inline-flex items-center gap-2"><Headphones size={15} className="text-rose-300" aria-hidden="true" /> 7/24 Kesintisiz Müzik</span>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <span className="text-amber-200/80">Kalbinin Frekansı</span>
          </div>
        </div>

        <div className="hidden items-center gap-4 border-l-2 border-rose-500/60 bg-black/20 px-4 py-3 backdrop-blur-sm sm:flex sm:min-w-64 md:relative md:min-h-40 md:overflow-hidden md:border md:border-white/10 md:bg-black/25 md:px-7 md:py-6 md:shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:backdrop-blur-md">
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-rose-500 via-rose-300/70 to-transparent md:block" />
          <span className="grid size-12 shrink-0 place-items-center border border-white/10 bg-rose-900/50 text-rose-200 md:size-16 md:rounded-full md:border-rose-300/20 md:bg-gradient-to-br md:from-rose-800/70 md:to-rose-950/70 md:shadow-[0_0_35px_rgba(225,29,72,0.18)]"><Mic2 size={23} className="md:size-7" aria-hidden="true" /></span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-200">
              <span className="hidden size-1.5 rounded-full bg-rose-400 md:inline-block" aria-hidden="true" /> Yayındaki DJ
            </p>
            <p className="mt-1 truncate font-semibold text-white md:mt-2 md:text-xl">{currentDj}</p>
            <p className="truncate text-sm text-stone-400 md:mt-1">{RADIO_CONFIG.currentDj.show}</p>
            <div className="mt-4 hidden h-4 items-end gap-1 md:flex" aria-hidden="true">
              {[7, 13, 9, 16, 11, 6, 14, 9, 12, 5].map((height, index) => (
                <span key={index} className="w-1 rounded-full bg-gradient-to-t from-rose-700 to-rose-300/90" style={{ height }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RadioBanner
