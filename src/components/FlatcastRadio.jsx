import { ExternalLink, Radio, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

function FlatcastRadio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [frameKey, setFrameKey] = useState(0)
  const { iframeUrl, width, height } = RADIO_CONFIG.flatcast

  const refreshRadio = () => {
    setIsLoaded(false)
    setFrameKey((currentKey) => currentKey + 1)
  }

  return (
    <section id="canli-yayin" aria-labelledby="flatcast-title" className="scroll-mt-20 pb-6">
      <div className="overflow-hidden border border-rose-300/15 bg-[#10070a] shadow-2xl shadow-black/40">
        <header className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center bg-rose-700/20 text-rose-300 ring-1 ring-rose-400/20">
              <Radio size={19} aria-hidden="true" />
            </span>
            <div>
              <h2 id="flatcast-title" className="font-semibold text-white">Ömür FM Canlı Yayın</h2>
              <p className="mt-0.5 text-xs text-stone-400">Yayını başlatmak için odadaki oynat düğmesine dokunun.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={refreshRadio} className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-stone-200 transition hover:bg-white/[0.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
              <RefreshCw size={14} aria-hidden="true" /> Yenile
            </button>
            <a href={iframeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-rose-400/25 bg-rose-700/15 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-700/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
              Yeni pencerede aç <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="bg-black p-2 sm:p-4">
          <div className="relative mx-auto h-[600px] w-full max-w-[800px] overflow-hidden bg-[#090507] sm:aspect-[4/3] sm:h-auto" style={{ maxWidth: width }}>
            {!isLoaded && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-[#090507]" role="status">
                <div className="flex items-center gap-3 text-sm text-stone-300">
                  <span className="block size-5 animate-spin rounded-full border-2 border-rose-300/20 border-t-rose-300 motion-reduce:animate-none" aria-hidden="true" />
                  Radyo odası yükleniyor…
                </div>
              </div>
            )}
            <iframe
              key={frameKey}
              src={iframeUrl}
              title="Ömür FM Flatcast canlı yayın odası"
              width={width}
              height={height}
              allow="autoplay; microphone"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setIsLoaded(true)}
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlatcastRadio
