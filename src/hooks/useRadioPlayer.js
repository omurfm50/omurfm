import { useCallback, useEffect, useRef, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

export function useRadioPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [previousVolume, setPreviousVolume] = useState(0.7)
  const [error, setError] = useState('')
  const isOnline = Boolean(RADIO_CONFIG.streamUrl.trim())

  const createAudio = useCallback(() => {
    if (!isOnline) return null
    if (!audioRef.current) {
      const audio = new Audio(RADIO_CONFIG.streamUrl)
      audio.preload = 'none'
      audio.volume = volume
      audio.addEventListener('error', () => {
        const mediaError = audio.error
        console.error('Ömür FM yayın hatası:', mediaError?.message ?? 'Bilinmeyen ses akışı hatası')
        setError('Yayın bağlantısı kurulamadı')
        setIsPlaying(false)
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [isOnline, volume])

  const togglePlay = useCallback(async () => {
    if (!isOnline) return
    const audio = createAudio()
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      setError('')
      await audio.play()
      setIsPlaying(true)
    } catch (playError) {
      console.error('Ömür FM yayını başlatılamadı:', playError)
      setError('Yayın bağlantısı kurulamadı')
      setIsPlaying(false)
    }
  }, [createAudio, isOnline])

  const setVolume = useCallback((nextVolume) => {
    const safeVolume = Math.min(1, Math.max(0, Number(nextVolume)))
    setVolumeState(safeVolume)
    if (safeVolume > 0) setPreviousVolume(safeVolume)
    if (audioRef.current) audioRef.current.volume = safeVolume
  }, [])

  const toggleMute = useCallback(() => {
    setVolume(volume > 0 ? 0 : previousVolume || 0.7)
  }, [previousVolume, setVolume, volume])

  const stop = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.removeAttribute('src')
    audioRef.current.load()
    audioRef.current = null
    setIsPlaying(false)
    setError('')
  }, [])

  const retry = useCallback(async () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeAttribute('src')
      audioRef.current.load()
      audioRef.current = null
    }
    setError('')
    await togglePlay()
  }, [togglePlay])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeAttribute('src')
        audioRef.current.load()
        audioRef.current = null
      }
    }
  }, [])

  return { isOnline, isPlaying, volume, error, togglePlay, stop, setVolume, toggleMute, retry }
}
