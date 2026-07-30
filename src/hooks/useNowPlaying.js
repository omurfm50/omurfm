import { useEffect, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

const REFRESH_INTERVAL_MS = 15000
const FALLBACK_TEXT = 'Canlı yayında şarkı bilgisi bekleniyor'

function getSource(payload) {
  const rawSources = payload?.icestats?.source
  const sources = Array.isArray(rawSources) ? rawSources : rawSources ? [rawSources] : []
  const mountpoint = new URL(RADIO_CONFIG.streamUrl).pathname.toLowerCase()

  return sources.find((item) => item?.listenurl?.toLowerCase().includes(mountpoint)) ?? sources[0]
}

function getRadioMetadata(payload) {
  const source = getSource(payload)
  const trackTitle = typeof source?.title === 'string' ? source.title.trim() : ''
  const djName = typeof source?.server_name === 'string' ? source.server_name.trim() : ''

  return {
    nowPlaying: trackTitle || FALLBACK_TEXT,
    currentDj: djName || RADIO_CONFIG.currentDj.name,
  }
}

export function useRadioMetadata() {
  const [metadata, setMetadata] = useState({
    nowPlaying: FALLBACK_TEXT,
    currentDj: RADIO_CONFIG.currentDj.name,
  })

  useEffect(() => {
    if (!RADIO_CONFIG.metadataUrl) return undefined

    let active = true
    let controller

    const loadMetadata = async () => {
      controller?.abort()
      controller = new AbortController()

      try {
        const response = await fetch(RADIO_CONFIG.metadataUrl, {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Metadata request failed: ${response.status}`)
        const payload = await response.json()
        if (active) setMetadata(getRadioMetadata(payload))
      } catch (error) {
        if (error.name !== 'AbortError') console.warn('Şarkı bilgisi alınamadı:', error.message)
      }
    }

    loadMetadata()
    const intervalId = window.setInterval(loadMetadata, REFRESH_INTERVAL_MS)

    return () => {
      active = false
      controller?.abort()
      window.clearInterval(intervalId)
    }
  }, [])

  return metadata
}

export function useNowPlaying() {
  return useRadioMetadata().nowPlaying
}
