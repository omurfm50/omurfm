import { Clock3, Mic2, UserRound } from 'lucide-react'
import { useState } from 'react'

function DjCard({ dj }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#120a0d] transition hover:-translate-y-1 hover:border-rose-400/20 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-950 via-[#2a0b14] to-stone-950">
        {!imageFailed ? (
          <img src={dj.image} alt={`${dj.name} profil görseli`} onError={() => setImageFailed(true)} className="size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
        ) : (
          <div className="grid size-full place-items-center text-rose-300/60"><UserRound size={64} strokeWidth={1} aria-hidden="true" /></div>
        )}
        {dj.isLive && <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-white shadow-lg"><span className="size-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none" /> CANLI</span>}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white">{dj.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-rose-200"><Mic2 size={15} aria-hidden="true" /> {dj.show}</p>
        <p className="mt-2 flex items-center gap-2 text-xs leading-5 text-stone-400"><Clock3 size={14} aria-hidden="true" /> {dj.schedule}</p>
      </div>
    </article>
  )
}

export default DjCard
