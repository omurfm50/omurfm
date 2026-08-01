import { RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useNowPlaying } from '../hooks/useNowPlaying.js'

const SCRIPT_ID = 'caster-fm-widget-script'
const RENDER_TIMEOUT_MS = 12000

function setWidgetAttributes(element) {
  const { type, publicToken, theme, color, channelId } = RADIO_CONFIG.casterWidget

  element.setAttribute('data-type', type)
  element.setAttribute('data-publicToken', publicToken)
  element.setAttribute('data-theme', theme)
  element.setAttribute('data-color', color)
  element.setAttribute('data-channelId', channelId)
  element.setAttribute('data-rendered', 'false')
}

function CasterWidget() {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const nowPlaying = useNowPlaying()

  useEffect(() => {
    const container = containerRef.current
    const { scriptUrl } = RADIO_CONFIG.casterWidget
    let observer
    let timeoutId
    let script
    let cancelled = false

    const clearWatchers = () => {
      observer?.disconnect()
      if (timeoutId) window.clearTimeout(timeoutId)
    }

    const markRendered = () => {
      if (cancelled) return
      const iframe = container.querySelector('iframe')
      if (iframe) {
        iframe.setAttribute('title', 'Ömür FM canlı yayın oynatıcısı')
      }
      clearWatchers()
      setStatus('rendered')
    }

    const markFailed = () => {
      if (cancelled) return
      clearWatchers()
      setStatus('error')
    }

    const watchForPlayer = () => {
      if (container.querySelector('iframe')) {
        markRendered()
        return
      }

      observer = new MutationObserver(() => {
        if (container.querySelector('iframe')) markRendered()
      })
      observer.observe(container, { childList: true, subtree: true })
      timeoutId = window.setTimeout(markFailed, RENDER_TIMEOUT_MS)
    }

    const requestRender = () => {
      if (cancelled) return
      if (container.querySelector('iframe')) {
        markRendered()
        return
      }
      setWidgetAttributes(container)
      if (typeof window.casterfmWidgetsRescan === 'function') {
        window.casterfmWidgetsRescan()
      }
    }

    const handleScriptLoad = () => {
      script.dataset.loaded = 'true'
      delete script.dataset.failed
      requestRender()
    }

    const handleScriptError = () => {
      script.dataset.failed = 'true'
      markFailed()
    }

    if (container.querySelector('iframe')) {
      markRendered()
    } else {
      setWidgetAttributes(container)
      watchForPlayer()
    }

    if (!scriptUrl.startsWith('https://')) {
      markFailed()
      return clearWatchers
    }

    script = document.getElementById(SCRIPT_ID)
    if (script?.dataset.failed === 'true') {
      script.remove()
      script = null
    }

    if (typeof window.casterfmWidgetsRescan === 'function') {
      requestRender()
    } else {
      if (!script) {
        script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = scriptUrl
        script.async = true
        document.body.appendChild(script)
      }
      script.addEventListener('load', handleScriptLoad)
      script.addEventListener('error', handleScriptError)
    }

    return () => {
      cancelled = true
      clearWatchers()
      script?.removeEventListener('load', handleScriptLoad)
      script?.removeEventListener('error', handleScriptError)
    }
  }, [attempt])

  const retry = () => {
    setStatus('loading')
    setAttempt((currentAttempt) => currentAttempt + 1)
  }

  return (
    <div className="caster-widget-shell relative min-h-52 overflow-hidden rounded-2xl border border-amber-200/15 bg-white shadow-inner sm:h-12 sm:min-h-0 sm:rounded-full sm:border-white/10 sm:bg-[#171717] sm:shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_8px_24px_rgba(0,0,0,.35)]">
      {status === 'loading' && (
        <div className="caster-widget-loading absolute inset-0 z-10 grid place-items-center bg-[#16090e] px-6 text-center" role="status">
          <div className="flex items-center justify-center gap-3">
            <span className="block size-5 animate-spin rounded-full border-2 border-rose-300/20 border-t-rose-300 motion-reduce:animate-none" aria-hidden="true" />
            <p className="text-xs font-semibold text-stone-300">Canlı yayın yükleniyor…</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="caster-widget-error absolute inset-0 z-10 grid place-items-center bg-[#16090e] px-3 text-center" role="alert">
          <div className="flex items-center justify-center gap-3">
            <p className="text-xs text-rose-200">Oynatıcı yüklenemedi.</p>
            <button type="button" onClick={retry} aria-label="Canlı yayın oynatıcısını yeniden yükle" className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
              <RefreshCw size={15} aria-hidden="true" /> Yeniden Dene
            </button>
          </div>
        </div>
      )}

      <div className="caster-widget-container w-full sm:absolute sm:inset-x-0 sm:bottom-0 sm:h-[170px] sm:overflow-hidden sm:overscroll-none" key={attempt}>
        <div ref={containerRef} className="cstrEmbed w-full [&_iframe]:min-h-52 sm:absolute sm:inset-x-0 sm:bottom-1 sm:!h-[170px] sm:[&_iframe]:!h-[170px] sm:[&_iframe]:min-h-0">
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Shoutcast Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Stream Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Radio Server Hosting</a>
        </div>
      </div>

      {status === 'rendered' && (
        <>
          <div className="pointer-events-none absolute left-1/2 top-[56%] z-20 hidden w-[34%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#171717]/90 py-1 text-xs font-semibold text-amber-100 shadow-[0_0_14px_rgba(0,0,0,.55)] sm:block" aria-live="polite" aria-label={`Çalan şarkı: ${nowPlaying}`}>
            <span className="now-playing-marquee__track">
              <span>♫ {nowPlaying}</span>
              <span aria-hidden="true">♫ {nowPlaying}</span>
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-6 bg-[#171717] sm:block" aria-hidden="true" />
        </>
      )}
    </div>
  )
}

export default CasterWidget
