import ChatRoom from './ChatRoom.jsx'
import CurrentDjCard from './CurrentDjCard.jsx'
import OnlineUsers from './OnlineUsers.jsx'

function RoomLayout({ onOpenRules }) {
  return (
    <section id="ana-oda" className="scroll-mt-20 py-5 sm:py-6">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)]">
        <ChatRoom onOpenRules={onOpenRules} />
        <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <OnlineUsers />
          <CurrentDjCard />
          <section className="border border-white/[0.09] bg-[#0e080a] p-4" aria-labelledby="room-info-title">
            <h2 id="room-info-title" className="text-sm font-semibold text-white">Oda Bilgisi</h2>
            <p className="mt-2 text-sm leading-6 text-stone-400">Müziği birlikte dinlediğimiz, dostça sohbet ettiğimiz Ömür FM ana odası.</p>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default RoomLayout
