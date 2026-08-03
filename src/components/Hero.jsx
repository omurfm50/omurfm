import { ArrowDown, Headphones, Heart, Radio } from 'lucide-react'
import RadioPlayer from './RadioPlayer.jsx'

function Hero() {
  return (
    <section id="ana-sayfa" className="relative scroll-mt-18 overflow-hidden bg-[radial-gradient(circle_at_15%_15%,rgba(159,18,57,0.22),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(127,29,29,0.18),transparent_30%),linear-gradient(135deg,#090507_0%,#1c0710_50%,#090507_100%)]">
      <Heart className="pointer-events-none absolute left-[6%] top-28 size-36 rotate-[-18deg] text-rose-800/10" strokeWidth={0.7} aria-hidden="true" />
      <Heart className="pointer-events-none absolute bottom-16 right-[5%] size-52 rotate-12 text-amber-200/[0.04]" strokeWidth={0.5} aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-950/30 px-3 py-2 text-[11px] font-bold tracking-[0.2em] text-rose-200">
            <span className="size-2 rounded-full bg-rose-400" />
            CANLI İNTERNET RADYOSU
          </div>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
            Kalplerin Buluştuğu <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">Radyo</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-300 sm:text-lg">
            Ömür FM’de müziğin, dostluğun ve güzel sohbetin ritmine ortak olun.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#canli-yayin" className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-700 px-6 py-3.5 font-semibold text-white shadow-xl shadow-rose-950/50 transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              <Headphones size={19} aria-hidden="true" /> Canlı Dinle
            </a>
            <a href="#yayin-akisi" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-stone-200 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
              Yayın Akışını Gör <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-7 flex items-center gap-2 text-sm text-stone-400">
            <Radio size={15} aria-hidden="true" />
            Canlı yayını oynatıcıdan kontrol edin
          </p>
        </div>
        <div id="canli-yayin" className="mx-auto w-full max-w-[500px] scroll-mt-24 lg:mx-0 lg:ml-auto">
          <RadioPlayer />
        </div>
      </div>
    </section>
  )
}

export default Hero
