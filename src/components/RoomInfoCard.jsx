import { Heart, Info } from 'lucide-react'

function RoomInfoCard() {
  return (
    <section className="border border-white/[0.09] bg-[#0e080a] p-4" aria-labelledby="room-info-title">
      <h2 id="room-info-title" className="flex items-center gap-2 text-sm font-semibold text-white"><Info size={16} className="text-rose-400" aria-hidden="true" /> Oda Bilgisi</h2>
      <p className="mt-3 text-sm leading-6 text-stone-400">Müziği birlikte dinlediğimiz, dostça sohbet ettiğimiz Ömür FM ana odası.</p>
      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-stone-400"><Heart size={13} className="mt-0.5 shrink-0 text-rose-400" aria-hidden="true" /> Saygılı, samimi ve huzurlu bir ortamı birlikte koruyalım.</p>
    </section>
  )
}

export default RoomInfoCard
