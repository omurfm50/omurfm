import CasterWidget from './CasterWidget.jsx'

function StickyRadioBar() {
  return (
    <section
      id="canli-yayin"
      aria-label="Ömür FM canlı yayın oynatıcısı"
      className="scroll-mt-20 py-6 sm:mx-auto sm:w-full sm:max-w-[714px] sm:py-4"
    >
      <CasterWidget />
    </section>
  )
}

export default StickyRadioBar
