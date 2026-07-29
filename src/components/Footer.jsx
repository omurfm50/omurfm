import { Heart, Radio } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

function Footer() {
  return (
    <footer id="hakkimizda" className="border-t border-white/[0.08] bg-[#070305] px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2"><Radio size={16} className="text-rose-400" aria-hidden="true" /><strong className="text-white">{RADIO_CONFIG.name}</strong><span>· {RADIO_CONFIG.slogan}</span></div>
        <p className="flex items-center gap-1.5 text-xs"><Heart size={12} aria-hidden="true" /> © {new Date().getFullYear()} · Müzik yayınları ilgili telif haklarına tabidir.</p>
      </div>
    </footer>
  )
}

export default Footer
