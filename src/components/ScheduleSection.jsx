import { Clock3, RadioTower } from 'lucide-react'
import { useState } from 'react'
import SectionTitle from './SectionTitle.jsx'

const SCHEDULE = {} // Yayın akışı verileri API'den gelecek
const DAYS = Object.keys(SCHEDULE)

function ScheduleSection({ compact = false }) {
  const [selectedDay, setSelectedDay] = useState('Pazartesi')

  return (
    <section id={compact ? undefined : 'yayin-akisi'} className={compact ? '' : 'scroll-mt-24 border-y border-white/[0.06] bg-[#0c0709] px-4 py-20 sm:px-6 lg:px-8 lg:py-28'}>
      <div className="mx-auto max-w-7xl">
        {!compact && <div className="flex justify-center"><SectionTitle eyebrow="Haftalık Program" title="Yayın Akışı" description="Haftanın her günü için hazırladığımız programları keşfedin." /></div>}
        <div className={`${compact ? '' : 'mt-10'} flex flex-wrap justify-center gap-2`} role="tablist" aria-label="Yayın günleri">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={selectedDay === day}
              aria-controls="schedule-panel"
              onClick={() => setSelectedDay(day)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${selectedDay === day ? 'bg-rose-700 text-white shadow-lg shadow-rose-950/40' : 'border border-white/10 bg-white/[0.03] text-stone-400 hover:bg-white/[0.07] hover:text-white'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <div id="schedule-panel" role="tabpanel" className="mx-auto mt-8 max-w-3xl space-y-3">
          {SCHEDULE[selectedDay].map((program) => (
            <article key={`${selectedDay}-${program.time}`} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:grid-cols-[6rem_1fr_auto] sm:px-6">
              <span className="flex items-center gap-2 font-semibold tabular-nums text-amber-200"><Clock3 size={16} aria-hidden="true" /> {program.time}</span>
              <div>
                <h3 className="font-semibold text-white">{program.title}</h3>
                <p className="mt-1 text-sm text-stone-400">{program.dj}</p>
              </div>
              <RadioTower className="hidden text-rose-400/60 sm:block" size={20} aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-stone-400">Program saatleri yayın durumuna göre değişiklik gösterebilir.</p>
      </div>
    </section>
  )
}

export default ScheduleSection
