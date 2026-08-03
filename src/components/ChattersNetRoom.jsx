import { RefreshCw, Users } from 'lucide-react'
import { useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

function getCountLabel(userCount, isLoading) {
  if (isLoading && userCount === null) return 'Kullanıcı sayısı yükleniyor'
  if (typeof userCount === 'number') return `${userCount} kişi sohbette`
  return 'Kullanıcı bilgisi alınamadı'
}

function ChattersNetRoom({ userCount, isLoading, error, refreshUserCount }) {
  const [frameStatus, setFrameStatus] = useState('loading')
  const [frameKey, setFrameKey] = useState(0)

  const reloadChat = () => {
    setFrameStatus('loading')
    setFrameKey((currentKey) => currentKey + 1)
    refreshUserCount()
  }

  // Bazı tarayıcılar iframe ağ hatalarını onError olayıyla bildirmeyebilir.
  const handleFrameError = () => setFrameStatus('error')

  return (
    <section aria-labelledby="chattersnet-room-title" className="overflow-hidden border-y border-rose-300/15 bg-[#0e080a] shadow-2xl shadow-black/30 sm:border">
      <div className="border-b border-white/[0.08] bg-[#160a0f] px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`size-2.5 shrink-0 rounded-full ${typeof userCount === 'number' ? 'bg-emerald-400' : isLoading ? 'bg-amber-300' : 'bg-rose-400'}`} aria-hidden="true" />
          <div className="min-w-0">
            <h2 id="chattersnet-room-title" className="truncate text-base font-semibold text-white sm:text-lg">{RADIO_CONFIG.chat.roomName}</h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-400" aria-live="polite"><Users size={13} aria-hidden="true" /> {getCountLabel(userCount, isLoading)}{error && userCount !== null ? ' · Son başarılı değer' : ''}</p>
          </div>
        </div>
      </div>

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
            className="block h-[620px] w-full border-0 md:h-[680px] xl:h-[700px]"
          />
        )}
      </div>
    </section>
  )
}

export default ChattersNetRoom
