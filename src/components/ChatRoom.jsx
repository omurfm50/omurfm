import { CircleAlert, MessageCircle, Send, ShieldCheck, Smile } from 'lucide-react'
import { useState } from 'react'
import { DEMO_MESSAGES } from '../data/demoMessages.js'

const MAX_MESSAGE_LENGTH = 240

function ChatRoom({ onOpenRules }) {
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setNotice(message.trim() ? 'Sohbet sistemi henüz aktif değil.' : 'Lütfen önce bir mesaj yazın.')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <section aria-labelledby="chat-room-title" className="overflow-hidden border border-white/[0.09] bg-[#0e080a] shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#160a0f] px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center bg-rose-700/25 text-rose-300"><MessageCircle size={18} aria-hidden="true" /></span>
          <div>
            <h2 id="chat-room-title" className="text-base font-semibold text-white sm:text-lg">Ömür FM Ana Oda</h2>
            <p className="text-xs text-stone-400">Demo sohbet görünümü · Kullanıcı bilgisi yakında</p>
          </div>
        </div>
        <button type="button" onClick={onOpenRules} className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-stone-200 transition hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
          <ShieldCheck size={16} aria-hidden="true" /> Kurallar
        </button>
      </div>

      <div className="h-[500px] space-y-4 overflow-y-auto px-4 py-5 sm:h-[580px] sm:px-5" aria-label="Demo sohbet mesajları" tabIndex="0">
        {DEMO_MESSAGES.map((item) => item.type === 'system' ? (
          <div key={item.id} className="mx-auto flex max-w-xl items-start gap-3 border border-amber-200/10 bg-amber-200/[0.04] px-4 py-3 text-sm text-amber-100/90">
            <CircleAlert size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div><p>{item.message}</p><p className="mt-1 text-xs text-amber-200/60">{item.timestamp}</p></div>
          </div>
        ) : (
          <article key={item.id} className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center border border-rose-300/15 bg-rose-950 text-xs font-bold text-rose-200" aria-hidden="true">{item.avatar}</span>
            <div className="min-w-0 flex-1 border-l border-white/[0.08] pl-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{item.username}</h3>
                {item.role !== 'Dinleyici' && <span className="bg-rose-700/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-200">{item.role}</span>}
                <time className="ml-auto text-xs text-stone-400">{item.timestamp}</time>
              </div>
              <p className="mt-1.5 break-words text-[15px] leading-6 text-stone-300">{item.message}</p>
            </div>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-white/[0.08] bg-[#12090c] p-3 sm:p-4">
        <label htmlFor="chat-message" className="sr-only">Sohbet mesajı</label>
        <div className="flex items-end gap-2">
          <button type="button" disabled aria-label="Emoji seçici yakında" className="grid size-11 shrink-0 cursor-not-allowed place-items-center border border-white/10 text-stone-500"><Smile size={19} aria-hidden="true" /></button>
          <textarea id="chat-message" rows="1" maxLength={MAX_MESSAGE_LENGTH} value={message} onChange={(event) => { setMessage(event.target.value); setNotice('') }} onKeyDown={handleKeyDown} placeholder="Mesajınızı yazın…" className="min-h-11 min-w-0 flex-1 resize-none border border-white/10 bg-black/25 px-3 py-2.5 text-[15px] text-white placeholder:text-stone-500 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20" />
          <button type="submit" aria-label="Mesajı gönder" className="grid size-11 shrink-0 place-items-center bg-rose-600 text-white transition hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"><Send size={18} aria-hidden="true" /></button>
        </div>
        <div className="mt-2 flex min-h-5 items-center justify-between gap-4">
          <p className="text-xs text-amber-200" aria-live="polite">{notice}</p>
          <span className="ml-auto text-xs tabular-nums text-stone-400">{message.length}/{MAX_MESSAGE_LENGTH}</span>
        </div>
      </form>
    </section>
  )
}

export default ChatRoom
