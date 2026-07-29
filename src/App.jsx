import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import NowPlaying from './components/NowPlaying.jsx'
import FeatureCards from './components/FeatureCards.jsx'
import DjSection from './components/DjSection.jsx'
import ScheduleSection from './components/ScheduleSection.jsx'
import ChatSection from './components/ChatSection.jsx'
import RequestSection from './components/RequestSection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090507] text-stone-100 selection:bg-rose-800 selection:text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-amber-200 px-4 py-2 font-semibold text-stone-950 transition focus:translate-y-0"
      >
        İçeriğe geç
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <NowPlaying />
        <FeatureCards />
        <DjSection />
        <ScheduleSection />
        <ChatSection />
        <RequestSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
