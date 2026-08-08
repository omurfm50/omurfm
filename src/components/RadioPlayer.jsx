import { Play, Radio, RefreshCw, Square, Volume2, VolumeX } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useNowPlaying } from '../hooks/useNowPlaying.js'
import { useRadioPlayer } from '../hooks/useRadioPlayer.js'
import CasterWidget from './CasterWidget.jsx'

function Html5Player() {
  const { isPlaying, volume, error, togglePlay, stop, setVolume, toggleMute, retry } = useRadioPlayer()
  const nowPlaying = useNowPlaying()

  return (
    <div className="mx-auto w-full max-w-[322px]">
      <div className="flex h-9 items-center gap-1 rounded-full border border-black bg-[linear-gradient(#777_0%,#292929_42%,#080808_55%,#303030_100%)] p-0.5 font-sans shadow-[inset_0_1px_0_rgba(255,255,255,.48),inset_0_-2px_3px_rgba(0,0,0,.9),0_1px_2px_#000]">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Yayını duraklat' : 'Yayını oynat'}
          aria-pressed={isPlaying}
          className={`flex h-[29px] w-[82px] shrink-0 items-center justify-center gap-1.5 rounded-full border border-neutral-900 bg-[linear-gradient(#626262_0%,#262626_46%,#050505_54%,#353535_100%)] px-2 text-[10px] font-bold tracking-[0.24em] text-green-300 shadow-[inset_0_1px_1px_rgba(255,255,255,.42),inset_0_-2px_2px_rgba(0,0,0,.85)] transition hover:brightness-125 focus-visible:outline-1 focus-visible:outline-green-300 ${isPlaying ? 'brightness-125' : ''}`}
        >
          PLAY <Play size={13} fill="currentColor" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={stop}
          aria-label="Yayını durdur"
          className="flex h-[29px] w-[82px] shrink-0 items-center justify-center gap-1.5 rounded-full border border-neutral-900 bg-[linear-gradient(#626262_0%,#262626_46%,#050505_54%,#353535_100%)] px-2 text-[10px] font-bold tracking-[0.24em] text-red-400 shadow-[inset_0_1px_1px_rgba(255,255,255,.42),inset_0_-2px_2px_rgba(0,0,0,.85)] transition hover:brightness-125 focus-visible:outline-1 focus-visible:outline-red-400"
        >
          STOP <Square size={11} fill="currentColor" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={volume === 0 ? 'Sesi aç' : 'Sesi kapat'}
          className="grid size-7 shrink-0 place-items-center rounded-full text-sky-200 transition hover:text-white focus-visible:outline-1 focus-visible:outline-sky-200"
        >
          {volume === 0 ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
        </button>

        <label className="flex min-w-0 flex-1 items-center">
          <span className="sr-only">Ses seviyesi</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(event.target.value)}
            className="mr-2 h-1.5 min-w-0 flex-1 cursor-pointer accent-neutral-200"
            aria-valuetext={`Yüzde ${Math.round(volume * 100)}`}
          />
        </label>
      </div>

      <div className="now-playing-marquee mt-1.5 overflow-hidden rounded-full border border-white/10 bg-black/65 py-1 text-[12px] font-semibold text-amber-200" aria-live="polite" aria-label={`Çalan şarkı: ${nowPlaying}`}>
        <span className="now-playing-marquee__track">
          <span>♫ {nowPlaying}</span>
          <span aria-hidden="true">♫ {nowPlaying}</span>
        </span>
      </div>

      {error && (
        <div className="mt-2 flex flex-col items-center justify-between gap-2 rounded-xl border border-rose-400/20 bg-rose-950/80 px-3 py-2 sm:flex-row">
          <p className="text-sm text-rose-200">{error}</p>
          <button type="button" onClick={retry} aria-label="Ses yayınını yeniden yükle" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber-300">
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

  if (hasStream) return <Html5Player />

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

      {hasCasterWidget ? (
        <div className="p-2 sm:p-3">
          <CasterWidget />
          <p className="px-2 pb-1 pt-2 text-center text-xs leading-5 text-stone-400">Yayını başlatmak için oynatıcının içindeki oynat düğmesine dokunun.</p>
        </div>
      ) : (
        <p className="m-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-stone-400">Yayın bağlantısı henüz eklenmedi.</p>
      )}
    </div>
  )
}

export default RadioPlayer
