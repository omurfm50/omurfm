import { HeartHandshake, MessageCircleHeart, Music2 } from 'lucide-react'

const FEATURES = [
  { icon: Music2, title: 'Kesintisiz Müzik', description: 'Ruhunuza dokunan seçkilerle günün her anına eşlik eden melodiler.' },
  { icon: MessageCircleHeart, title: 'Canlı Sohbet', description: 'Ömür FM ailesiyle aynı duyguda buluşacağınız sıcak bir sohbet ortamı.' },
  { icon: HeartHandshake, title: 'Şarkı İstekleri', description: 'Sevdiklerinize armağan etmek istediğiniz şarkıları bizimle paylaşın.' },
]

function FeatureCards() {
  return (
    <section aria-label="Ömür FM özellikleri" className="border-y border-white/[0.06] bg-white/[0.015] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <article key={title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-rose-400/20 hover:bg-white/[0.05] motion-reduce:transform-none motion-reduce:transition-none">
            <span className="grid size-11 place-items-center rounded-xl bg-rose-900/30 text-rose-300 ring-1 ring-rose-300/10">
              <Icon size={21} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-400">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeatureCards
