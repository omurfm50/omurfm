import { MessageCircleHeart, Sparkles } from 'lucide-react'

function ChatSection() {
  return (
    <section id="sohbet" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-rose-300/10 bg-[linear-gradient(120deg,#280b15,#12090c_60%,#1e0a10)] px-6 py-12 text-center shadow-2xl shadow-black/20 sm:px-12 sm:py-16">
        <Sparkles className="absolute right-8 top-8 text-amber-200/20" aria-hidden="true" />
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-700/20 text-rose-200 ring-1 ring-rose-300/20"><MessageCircleHeart aria-hidden="true" /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-300/90">Birlikte Daha Güzel</p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Ömür FM Sohbet Odası</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-400">Müziğe eşlik eden sıcak sohbetler ve yeni dostluklar için hazırladığımız odamız çok yakında sizlerle.</p>
        <button type="button" disabled className="mt-7 inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-stone-400">
          <MessageCircleHeart size={18} aria-hidden="true" /> Sohbete Katıl
        </button>
        <p className="mt-4 text-xs text-stone-400">Sohbet sistemi yakında aktif olacak</p>
        <div id="chat-integration-placeholder" aria-hidden="true" className="hidden" />
      </div>
    </section>
  )
}

export default ChatSection
