import { RADIO_CONFIG } from '../config/radio.js'
import CasterWidget from './CasterWidget.jsx'
import RadioPlayer from './RadioPlayer.jsx'

function StickyRadioBar() {
  const hasStream = Boolean(RADIO_CONFIG.streamUrl.trim())

  return (
    <section id="canli-yayin" aria-label="Canlı yayın oynatıcısı" className="scroll-mt-20 pb-5 md:sticky md:bottom-0 md:z-40">
      <div className="border border-rose-300/15 bg-[#10070a]/95 p-3 shadow-[0_-14px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="min-w-0">
          {hasStream ? <RadioPlayer /> : <CasterWidget />}
        </div>
      </div>
    </section>
  )
}

export default StickyRadioBar
