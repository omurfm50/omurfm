const STATUS_URL = 'https://sapircast.caster.fm:17681/status-json.xsl?token=3ec856e02e682b10b5907facd25efed4'

function getSource(payload) {
  const rawSources = payload?.icestats?.source
  const sources = Array.isArray(rawSources) ? rawSources : rawSources ? [rawSources] : []

  return sources.find((source) => source?.listenurl?.includes('/BHufv')) ?? sources[0]
}

function getDjName(source) {
  const streamWebsite = typeof source?.server_url === 'string' ? source.server_url.trim() : ''
  const streamName = typeof source?.server_name === 'string' ? source.server_name.trim() : ''

  if (streamWebsite && !/^https?:\/\//i.test(streamWebsite)) return streamWebsite
  return streamName || 'Ömür FM'
}

export default async function handler(_request, response) {
  try {
    const upstreamResponse = await fetch(STATUS_URL, { cache: 'no-store' })
    if (!upstreamResponse.ok) throw new Error(`Caster.fm yanıtı: ${upstreamResponse.status}`)

    const payload = await upstreamResponse.json()
    const source = getSource(payload)

    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=20')
    return response.status(200).json({
      nowPlaying: typeof source?.title === 'string' ? source.title.trim() : '',
      currentDj: getDjName(source),
    })
  } catch (error) {
    console.error('Radyo metadatası alınamadı:', error)
    return response.status(502).json({ error: 'Yayın bilgisi alınamadı' })
  }
}
