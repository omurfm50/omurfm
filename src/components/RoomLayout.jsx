import { useChatUserCount } from '../hooks/useChatUserCount.js'
import ChattersNetRoom from './ChattersNetRoom.jsx'

function RoomLayout({ onOpenRules }) {
  const userCountState = useChatUserCount()

  return (
    <section id="ana-oda" className="scroll-mt-20 py-5 sm:py-6">
      <div>
        <ChattersNetRoom {...userCountState} refreshUserCount={userCountState.refresh} onOpenRules={onOpenRules} />
      </div>
    </section>
  )
}

export default RoomLayout
