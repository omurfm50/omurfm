import CasterWidget from './CasterWidget.jsx'

function StickyRadioBar() {
  return (
    <>
      <div className="hidden h-[72px] sm:block" aria-hidden="true" />
      <section
        id="canli-yayin"
        aria-label="Ömür FM canlı yayın oynatıcısı"
        className="scroll-mt-20 py-6 sm:fixed sm:inset-x-5 sm:bottom-3 sm:z-50 sm:mx-auto sm:max-w-[840px] sm:py-0"
      >
        <CasterWidget />
      </section>
    </>
  )
}

export default StickyRadioBar
