import { Hash, MessageCircle, ShieldCheck, Users } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

function OnlineSummaryCard({ userCount, isLoading }) {
  const countText = isLoading && userCount === null ? 'Yükleniyor…' : typeof userCount === 'number' ? userCount : '—'

  return (
    <section aria-labelledby="online-summary-title" className="border border-white/[0.09] bg-[#0e080a]">
      <div className="border-b border-white/[0.08] bg-[#160a0f] px-4 py-3.5">
        <h2 id="online-summary-title" className="flex items-center gap-2 font-semibold text-white"><Users size={18} className="text-rose-400" aria-hidden="true" /> Sohbet Özeti</h2>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3"><span className="text-sm text-stone-400">Aktif sohbet</span><strong className="text-xl text-rose-300" aria-live="polite">{countText}</strong></div>
        <div className="flex items-start gap-3"><MessageCircle size={16} className="mt-0.5 shrink-0 text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Oda adı</p><p className="mt-0.5 text-sm font-medium text-white">{RADIO_CONFIG.chat.roomName}</p></div></div>
        <div className="flex items-start gap-3"><Hash size={16} className="mt-0.5 shrink-0 text-rose-400" aria-hidden="true" /><div><p className="text-xs text-stone-400">Kanal</p><p className="mt-0.5 text-sm font-medium text-white">{RADIO_CONFIG.chat.channelName}</p></div></div>
        <p className="border-l-2 border-rose-500 bg-rose-950/20 px-3 py-2 text-sm leading-6 text-stone-300">Sohbete katılmak için oda içinde bir kullanıcı adı seçin.</p>
        <p className="flex items-start gap-2 text-xs leading-5 text-stone-400"><ShieldCheck size={14} className="mt-0.5 shrink-0" aria-hidden="true" /> Kamera ve mikrofon izinleri isteğe bağlıdır.</p>
      </div>
    </section>
  )
}

export default OnlineSummaryCard
