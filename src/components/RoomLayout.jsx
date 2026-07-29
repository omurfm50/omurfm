import { useChatUserCount } from '../hooks/useChatUserCount.js'
import ChattersNetRoom from './ChattersNetRoom.jsx'
import CurrentDjCard from './CurrentDjCard.jsx'
import OnlineSummaryCard from './OnlineSummaryCard.jsx'
import RoomInfoCard from './RoomInfoCard.jsx'

function RoomLayout({ onOpenRules }) {
  const userCountState = useChatUserCount()

  return (
    <section id="ana-oda" className="scroll-mt-20 py-5 sm:py-6">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)]">
        <ChattersNetRoom {...userCountState} refreshUserCount={userCountState.refresh} onOpenRules={onOpenRules} />
        <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <CurrentDjCard />
          <OnlineSummaryCard userCount={userCountState.userCount} isLoading={userCountState.isLoading} />
          <RoomInfoCard />
        </aside>
      </div>
    </section>
  )
}

export default RoomLayout
