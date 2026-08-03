import { useChatUserCount } from '../hooks/useChatUserCount.js'
import ChattersNetRoom from './ChattersNetRoom.jsx'

function RoomLayout() {
  const userCountState = useChatUserCount()

  return (
    <section id="ana-oda" className="-mx-3 scroll-mt-20 py-5 sm:mx-0 sm:py-6">
      <div>
        <ChattersNetRoom {...userCountState} refreshUserCount={userCountState.refresh} />
      </div>
    </section>
  )
}

export default RoomLayout
