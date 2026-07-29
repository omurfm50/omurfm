import { useCallback, useEffect, useRef, useState } from 'react'
import { RADIO_CONFIG } from '../config/radio.js'

const POLL_INTERVAL_MS = 10000

function parseUserCount(rawValue) {
  const normalizedValue = rawValue.trim()
  if (!/^\d+$/.test(normalizedValue)) return null

  const parsedValue = Number(normalizedValue)
  return Number.isSafeInteger(parsedValue) && parsedValue >= 0 ? parsedValue : null
}

export function useChatUserCount() {
  const [userCount, setUserCount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const requestControllerRef = useRef(null)
  const lastSuccessfulCountRef = useRef(null)

  const fetchUserCount = useCallback(async (showLoading = false) => {
    requestControllerRef.current?.abort()
    const controller = new AbortController()
    requestControllerRef.current = controller
    if (showLoading) setIsLoading(true)

    try {
      const response = await fetch(RADIO_CONFIG.chat.userCountUrl, {
        signal: controller.signal,
        headers: { Accept: 'text/plain' },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const nextCount = parseUserCount(await response.text())
      if (nextCount === null) throw new Error('Geçersiz kullanıcı sayısı')

      lastSuccessfulCountRef.current = nextCount
      setUserCount(nextCount)
      setError('')
    } catch (requestError) {
      if (requestError.name === 'AbortError') return
      if (lastSuccessfulCountRef.current === null) setUserCount(null)
      setError('Kullanıcı bilgisi alınamadı')
    } finally {
      if (!controller.signal.aborted) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Gecikmeli ilk çağrı, React StrictMode'un deneme effect'inde çift istek oluşmasını önler.
    const initialRequestId = window.setTimeout(() => fetchUserCount(true), 0)
    const intervalId = window.setInterval(() => fetchUserCount(false), POLL_INTERVAL_MS)

    return () => {
      window.clearTimeout(initialRequestId)
      window.clearInterval(intervalId)
      requestControllerRef.current?.abort()
    }
  }, [fetchUserCount])

  const refresh = useCallback(() => fetchUserCount(userCount === null), [fetchUserCount, userCount])

  return { userCount, isLoading, error, refresh }
}
