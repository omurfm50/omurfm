import { useCallback, useState } from 'react'
import DjSection from './components/DjSection.jsx'
import Header from './components/Header.jsx'
import Modal from './components/Modal.jsx'
import RadioBanner from './components/RadioBanner.jsx'
import ScheduleSection from './components/ScheduleSection.jsx'
import StickyRadioBar from './components/StickyRadioBar.jsx'

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const closeModal = useCallback(() => setActiveModal(null), [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070305] text-stone-100 selection:bg-rose-700 selection:text-white">
      <a href="#main-content" className="fixed left-4 top-4 z-[120] -translate-y-24 bg-amber-200 px-4 py-2 font-semibold text-stone-950 transition focus:translate-y-0">İçeriğe geç</a>
      <Header onOpenSchedule={() => setActiveModal('schedule')} onOpenDjs={() => setActiveModal('djs')} />

      <main id="main-content" className="mx-auto w-full max-w-[1240px] px-3 sm:px-5">
        <RadioBanner />
        <StickyRadioBar />
      </main>
      <Modal isOpen={activeModal === 'djs'} onClose={closeModal} eyebrow="Mikrofonun Arkasındakiler" title="DJ Kadrosu">
        <DjSection compact />
      </Modal>
      <Modal isOpen={activeModal === 'schedule'} onClose={closeModal} eyebrow="Haftalık Program" title="Yayın Akışı">
        <ScheduleSection compact />
      </Modal>
    </div>
  )
}

export default App
