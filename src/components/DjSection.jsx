import DjCard from './DjCard.jsx'
import SectionTitle from './SectionTitle.jsx'

const DJS = [] // DJ verileri API'den gelecek

function DjSection({ compact = false }) {
  return (
    <section id={compact ? undefined : 'dj-kadrosu'} className={compact ? '' : 'scroll-mt-24 bg-[radial-gradient(circle_at_50%_40%,rgba(127,29,29,0.11),transparent_42%)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28'}>
      <div className="mx-auto max-w-7xl">
        {!compact && <div className="flex justify-center"><SectionTitle eyebrow="Mikrofonun Arkasındakiler" title="DJ Kadromuz" description="Her programda farklı bir hikâye, her mikrofonda aynı samimiyet." /></div>}
        <div className={`${compact ? '' : 'mt-12'} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
          {DJS.map((dj) => <DjCard key={dj.id} dj={dj} />)}
        </div>
      </div>
    </section>
  )
}

export default DjSection
