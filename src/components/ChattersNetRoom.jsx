import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

function ChattersNetRoom() {
  const [frameStatus, setFrameStatus] = useState('loading')
  const [frameKey, setFrameKey] = useState(0)

  const reloadChat = () => {
    setFrameStatus('loading')
    setFrameKey((currentKey) => currentKey + 1)
  }

  // Bazı tarayıcılar iframe ağ hatalarını onError olayıyla bildirmeyebilir.
  const handleFrameError = () => setFrameStatus('error')

  return (
    <section aria-label="Canlı sohbet odası" className="overflow-hidden border-y border-rose-300/15 bg-[#0e080a] shadow-2xl shadow-black/30 sm:border">
      <div className="relative overflow-hidden bg-[#090507]">
        {frameStatus === 'loading' && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-[#10070a]" role="status">
            <div className="text-center"><span className="mx-auto block size-9 animate-spin rounded-full border-2 border-rose-300/20 border-t-rose-300 motion-reduce:animate-none" aria-hidden="true" /><p className="mt-4 text-sm text-stone-300">Sohbet odası yükleniyor…</p></div>
          </div>
        )}
        {frameStatus === 'error' ? (
          <div className="grid h-[620px] place-items-center px-5 text-center md:h-[680px] xl:h-[700px]" role="alert">
            <div><p className="text-sm text-rose-200">Sohbet odası yüklenemedi.</p><button type="button" onClick={reloadChat} className="mt-4 inline-flex items-center gap-2 bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><RefreshCw size={16} aria-hidden="true" /> Yeniden Dene</button></div>
          </div>
        ) : (
          <iframe
            key={frameKey}
            src={RADIO_CONFIG.chat.iframeUrl}
            title="Ömür FM canlı sohbet odası"
            allow="camera; microphone"
            loading="eager"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setFrameStatus('loaded')}
            onError={handleFrameError}
            className="-mt-1 block h-[624px] w-full border-0 md:h-[684px] xl:h-[704px]"
          />
        )}
      </div>
    </section>
  )
}

export default ChattersNetRoom
