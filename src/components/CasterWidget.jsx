import { RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'
import { useNowPlaying } from '../hooks/useNowPlaying.js'

const SCRIPT_ID = 'caster-fm-widget-script'
const RENDER_TIMEOUT_MS = 12000
const MOBILE_FRAME_WIDTH = 800
const MOBILE_FRAME_HEIGHT = 187
const DESKTOP_FRAME_HEIGHT = 170
const MOBILE_HORIZONTAL_PADDING = 6
const MOBILE_BAR_HEIGHT = 32
const MOBILE_PLAY_SCALE = 0.6
const MOBILE_PLAY_BUTTON_RIGHT = 784

function sizeWidgetContainer(element, mobile) {
  if (!element) return

  element.style.setProperty('width', mobile ? `${MOBILE_FRAME_WIDTH}px` : '100%', 'important')
  element.style.setProperty('max-width', mobile ? 'none' : '100%', 'important')
  element.style.setProperty('height', `${mobile ? MOBILE_FRAME_HEIGHT : DESKTOP_FRAME_HEIGHT}px`, 'important')
  element.style.setProperty('overflow', mobile ? 'visible' : 'hidden', 'important')
}

function setWidgetAttributes(element) {
  const { type, publicToken, theme, color, channelId, autoplay } = RADIO_CONFIG.casterWidget

  element.setAttribute('data-type', type)
  element.setAttribute('data-publicToken', publicToken)
  element.setAttribute('data-theme', theme)
  element.setAttribute('data-color', color)
  element.setAttribute('data-channelId', channelId)
  element.setAttribute('data-autoplay', String(autoplay))
  element.setAttribute('data-rendered', 'false')
}

function configurePlayerIframe(iframe) {
  if (!iframe) return

  iframe.setAttribute('title', 'Ömür FM canlı yayın oynatıcısı')
  iframe.setAttribute('scrolling', 'no')
  iframe.style.setProperty('overflow', 'hidden')
  iframe.style.setProperty('overscroll-behavior', 'none')
  if (!RADIO_CONFIG.casterWidget.autoplay) return

  iframe.setAttribute('allow', 'autoplay')
  const playerUrl = new URL(iframe.src)
  if (playerUrl.searchParams.get('autoplay') !== '1') {
    playerUrl.searchParams.set('autoplay', '1')
    iframe.src = playerUrl.toString()
  }
}

function CasterWidget() {
  const shellRef = useRef(null)
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [mobileLayout, setMobileLayout] = useState({ active: false, scale: 1, left: 0 })
  const nowPlaying = useNowPlaying()

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const fitMobilePlayer = () => {
      const active = window.innerWidth < 640
      const scale = active ? MOBILE_PLAY_SCALE : 1
      const left = active
        ? shell.clientWidth - MOBILE_HORIZONTAL_PADDING - MOBILE_PLAY_BUTTON_RIGHT * scale
        : 0
      sizeWidgetContainer(containerRef.current, active)
      setMobileLayout({ active, scale, left })
    }

    fitMobilePlayer()
    const resizeObserver = new ResizeObserver(fitMobilePlayer)
    resizeObserver.observe(shell)
    window.addEventListener('resize', fitMobilePlayer)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', fitMobilePlayer)
    }
  }, [])

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
      configurePlayerIframe(iframe)
      sizeWidgetContainer(container, window.innerWidth < 640)
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
    <div
      ref={shellRef}
      className="caster-widget-shell relative h-8 overflow-hidden rounded-full border border-white/10 bg-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_8px_24px_rgba(0,0,0,.35)] sm:h-12 sm:border-white/25 sm:bg-[#717276] sm:shadow-[inset_0_1px_0_rgba(255,255,255,.28),inset_0_-1px_0_rgba(255,255,255,.28),0_8px_24px_rgba(0,0,0,.35)]"
    >
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

      <div className="caster-widget-container absolute inset-0 z-10 w-full overflow-hidden sm:inset-x-0 sm:bottom-0 sm:top-auto sm:h-[170px]" key={attempt}>
        <div
          ref={containerRef}
          className="cstrEmbed absolute left-0 top-0 !h-[187px] !w-[800px] origin-top-left [&_iframe]:!h-[187px] [&_iframe]:!w-[800px] [&_iframe]:!max-w-none sm:inset-x-0 sm:bottom-[8px] sm:top-auto sm:!h-[170px] sm:!w-full sm:[&_iframe]:!h-[170px] sm:[&_iframe]:!w-full"
          style={mobileLayout.active ? {
            left: mobileLayout.left,
            top: MOBILE_BAR_HEIGHT - MOBILE_FRAME_HEIGHT * mobileLayout.scale,
            transform: `scale(${mobileLayout.scale})`,
          } : undefined}
        >
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Shoutcast Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Stream Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Radio Server Hosting</a>
        </div>
      </div>

      {status === 'rendered' && (
        <>
          <span className="absolute inset-y-0 left-0 right-[31%] z-[25] hidden cursor-default sm:block" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex w-[68px] items-center justify-center bg-[#686868] text-[8px] font-bold italic text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)] sm:hidden" aria-hidden="true">
            Caster<span className="rounded-sm bg-rose-600 px-0.5 text-white">.fm</span>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-[68px] right-[82px] z-20 flex items-center overflow-hidden bg-[#5f5f5f] text-[8px] font-semibold leading-[11px] text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] sm:inset-y-auto sm:bottom-auto sm:left-[calc(22%-35px)] sm:right-[355px] sm:top-1/2 sm:block sm:w-auto sm:translate-x-0 sm:-translate-y-1/2 sm:rounded-full sm:bg-[#171717]/90 sm:py-1 sm:text-xs sm:leading-normal sm:shadow-[0_0_14px_rgba(0,0,0,.55)]" aria-live="polite" aria-label={`Çalan şarkı: ${nowPlaying}`}>
            <span className="now-playing-marquee__track">
              <span>♫ {nowPlaying}</span>
              <span aria-hidden="true">♫ {nowPlaying}</span>
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default CasterWidget
