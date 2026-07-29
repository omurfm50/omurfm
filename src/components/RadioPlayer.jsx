import { Pause, Play, Radio, RefreshCw, Volume2, VolumeX } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useRadioPlayer } from '../hooks/useRadioPlayer.js'
import CasterWidget from './CasterWidget.jsx'

function Html5Player() {
  const { isPlaying, volume, error, togglePlay, setVolume, toggleMute, retry } = useRadioPlayer()

  return (
    <div className="p-5 sm:p-7">
      <div className="my-7 flex h-14 items-end justify-center gap-1.5" aria-hidden="true">
        {[40, 75, 55, 90, 65, 45, 80, 58, 95, 68, 48, 72, 42, 84, 55, 70, 38, 62].map((height, index) => (
          <span
            key={`${height}-${index}`}
            className={`w-1 rounded-full bg-gradient-to-t from-rose-800 to-amber-300/90 ${isPlaying ? 'animate-pulse motion-reduce:animate-none' : 'opacity-45'}`}
            style={{ height: `${isPlaying ? height : Math.max(18, height / 2)}%`, animationDelay: `${index * 70}ms` }}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Yayını duraklat' : 'Yayını oynat'}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-lg shadow-rose-950/60 transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 motion-reduce:transition-none"
        >
          {isPlaying ? <Pause fill="currentColor" aria-hidden="true" /> : <Play className="translate-x-0.5" fill="currentColor" aria-hidden="true" />}
        </button>
        <button type="button" onClick={toggleMute} aria-label={volume === 0 ? 'Sesi aç' : 'Sesi kapat'} className="rounded-lg p-2 text-stone-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-amber-300">
          {volume === 0 ? <VolumeX size={21} aria-hidden="true" /> : <Volume2 size={21} aria-hidden="true" />}
        </button>
        <label className="sr-only" htmlFor="volume">Ses seviyesi</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
          className="h-1.5 min-w-0 flex-1 cursor-pointer accent-rose-600"
          aria-valuetext={`Yüzde ${Math.round(volume * 100)}`}
        />
      </div>
      {error && (
        <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-950/30 px-4 py-3 sm:flex-row">
          <p className="text-sm text-rose-200">{error}</p>
          <button type="button" onClick={retry} aria-label="Ses yayınını yeniden yükle" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber-300">
            <RefreshCw size={15} aria-hidden="true" /> Yeniden Dene
          </button>
        </div>
      )}
    </div>
  )
}

function RadioPlayer() {
  const hasStream = Boolean(RADIO_CONFIG.streamUrl.trim())
  const hasCasterWidget = Boolean(RADIO_CONFIG.casterWidget.publicToken.trim())

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-amber-200/15 bg-black/45 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-rose-700/20 blur-3xl" />
      <div className="relative flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
        <span className="grid size-10 place-items-center rounded-xl bg-rose-700/20 text-rose-300 ring-1 ring-rose-400/20">
          <Radio size={19} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{RADIO_CONFIG.name} Canlı Yayın</p>
          <p className="mt-0.5 text-xs text-stone-400">Yayın durumunu oynatıcıdan kontrol edin</p>
        </div>
      </div>

      {hasStream && <Html5Player />}
      {!hasStream && hasCasterWidget && (
        <div className="p-3 sm:p-4">
          <CasterWidget />
          <p className="px-2 pb-1 pt-4 text-center text-xs leading-5 text-stone-400">Yayını başlatmak için oynatıcının içindeki oynat düğmesine dokunun.</p>
        </div>
      )}
      {!hasStream && !hasCasterWidget && (
        <p className="m-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-stone-400">Yayın bağlantısı henüz eklenmedi.</p>
      )}
    </div>
  )
}

export default RadioPlayer
