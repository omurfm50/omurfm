import { Heart, Music2, Send } from 'lucide-react'
import { useState } from 'react'
import SectionTitle from './SectionTitle.jsx'

const INITIAL_FORM = { listenerName: '', song: '', message: '' }

function RequestSection() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.listenerName.trim()) nextErrors.listenerName = 'Lütfen adınızı yazın.'
    if (!form.song.trim()) nextErrors.song = 'Lütfen istediğiniz şarkıyı yazın.'
    if (!form.message.trim()) nextErrors.message = 'Lütfen kısa bir mesaj yazın.'
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setNotice('')
      return
    }

    setNotice('İstek sistemi henüz aktif değil')
  }

  return (
    <section id="iletisim" className="scroll-mt-24 bg-[radial-gradient(circle_at_20%_60%,rgba(136,19,55,0.12),transparent_32%)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionTitle eyebrow="Sıradaki Şarkı Senin" title="Şarkı İsteğini Bırak" description="Dinlemek istediğin şarkıyı ve mesajını bizimle paylaş. İstek sistemi aktif olduğunda yayıncılarımız mesajını görebilecek." align="left" />
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-900/30 text-rose-300"><Heart size={19} aria-hidden="true" /></span>
            <p className="text-sm leading-6 text-stone-400">Gönderilen bilgiler şu an hiçbir yere kaydedilmez veya iletilmez. Bu alan, gelecek istek sistemi için hazırlanmıştır.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-white/10 bg-[#120a0d] p-5 shadow-2xl shadow-black/20 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="listenerName" className="mb-2 block text-sm font-medium text-stone-200">Dinleyici adı</label>
              <input
                id="listenerName"
                name="listenerName"
                type="text"
                value={form.listenerName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.listenerName)}
                aria-describedby={errors.listenerName ? 'listenerName-error' : undefined}
                placeholder="Adınız"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-stone-600 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              {errors.listenerName && <p id="listenerName-error" className="mt-2 text-xs text-rose-300">{errors.listenerName}</p>}
            </div>
            <div>
              <label htmlFor="song" className="mb-2 block text-sm font-medium text-stone-200">İstenen şarkı</label>
              <div className="relative">
                <Music2 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={17} aria-hidden="true" />
                <input
                  id="song"
                  name="song"
                  type="text"
                  value={form.song}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.song)}
                  aria-describedby={errors.song ? 'song-error' : undefined}
                  placeholder="Sanatçı — Şarkı"
                  className="w-full rounded-xl border border-white/10 bg-black/25 py-3 pl-11 pr-4 text-white placeholder:text-stone-600 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              {errors.song && <p id="song-error" className="mt-2 text-xs text-rose-300">{errors.song}</p>}
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-stone-200">Mesaj</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              placeholder="Şarkını kime armağan etmek istersin?"
              className="w-full resize-y rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-stone-600 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            {errors.message && <p id="message-error" className="mt-2 text-xs text-rose-300">{errors.message}</p>}
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-700 px-6 py-3.5 font-semibold text-white transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:w-auto">
            <Send size={18} aria-hidden="true" /> İsteği Gönder
          </button>
          <div aria-live="polite">
            {notice && <p className="mt-4 rounded-xl border border-amber-300/15 bg-amber-200/[0.06] px-4 py-3 text-sm text-amber-100">{notice}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default RequestSection
