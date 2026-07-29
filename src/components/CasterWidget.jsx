import { RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

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
      container.querySelector('iframe')?.setAttribute('title', 'Ömür FM canlı yayın oynatıcısı')
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
    <div className="caster-widget-shell relative min-h-52 overflow-hidden rounded-2xl border border-amber-200/15 bg-white shadow-inner">
      {status === 'loading' && (
        <div className="caster-widget-loading absolute inset-0 z-10 grid place-items-center bg-[#16090e] px-6 text-center" role="status">
          <div>
            <span className="mx-auto block size-9 animate-spin rounded-full border-2 border-rose-300/20 border-t-rose-300 motion-reduce:animate-none" aria-hidden="true" />
            <p className="mt-4 text-sm text-stone-300">Canlı yayın oynatıcısı yükleniyor…</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="caster-widget-error absolute inset-0 z-10 grid place-items-center bg-[#16090e] px-6 text-center" role="alert">
          <div>
            <p className="text-sm text-rose-200">Canlı yayın oynatıcısı yüklenemedi.</p>
            <button type="button" onClick={retry} aria-label="Canlı yayın oynatıcısını yeniden yükle" className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
              <RefreshCw size={15} aria-hidden="true" /> Yeniden Dene
            </button>
          </div>
        </div>
      )}

      <div className="caster-widget-container w-full" key={attempt}>
        <div ref={containerRef} className="cstrEmbed">
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Shoutcast Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Stream Hosting</a>
          <a href="https://www.caster.fm" target="_blank" rel="noopener noreferrer">Radio Server Hosting</a>
        </div>
      </div>
    </div>
  )
}

export default CasterWidget
