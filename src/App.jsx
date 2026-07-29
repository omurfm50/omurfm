import { useCallback, useState } from 'react'
import DjSection from './components/DjSection.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Modal from './components/Modal.jsx'
import RadioBanner from './components/RadioBanner.jsx'
import RadioStatusBar from './components/RadioStatusBar.jsx'
import RoomLayout from './components/RoomLayout.jsx'
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
        <RadioStatusBar />
        <RoomLayout onOpenRules={() => setActiveModal('rules')} />
        <StickyRadioBar />
      </main>
      <Footer />

      <Modal isOpen={activeModal === 'djs'} onClose={closeModal} eyebrow="Mikrofonun Arkasındakiler" title="DJ Kadrosu">
        <DjSection compact />
      </Modal>
      <Modal isOpen={activeModal === 'schedule'} onClose={closeModal} eyebrow="Haftalık Program" title="Yayın Akışı">
        <ScheduleSection compact />
      </Modal>
      <Modal isOpen={activeModal === 'rules'} onClose={closeModal} eyebrow="Birlikte Daha Güzel" title="Sohbet Kuralları">
        <div className="space-y-4 text-[15px] leading-7 text-stone-300">
          <p>Ömür FM sohbet odası dostluk, saygı ve güzel müzik etrafında buluşmak içindir.</p>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Diğer dinleyicilere ve yayıncılara karşı saygılı olun.</li>
            <li>Kişisel bilgilerinizi ve özel iletişim bilgilerinizi paylaşmayın.</li>
            <li>Tekrarlayan mesaj, reklam ve rahatsız edici içerik göndermeyin.</li>
            <li>Müzik istekleri için Şarkı İste alanını kullanın.</li>
          </ol>
          <p className="border-l-2 border-rose-500 bg-rose-950/25 px-4 py-3 text-sm text-rose-100">Oda yönetimi, herkes için huzurlu bir ortam sağlamak amacıyla bu kuralları uygular.</p>
        </div>
      </Modal>
    </div>
  )
}

export default App
