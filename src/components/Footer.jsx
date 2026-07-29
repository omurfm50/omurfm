import { Facebook, Heart, Instagram, Radio } from 'lucide-react'
import { RADIO_CONFIG } from '../config/radio.js'

const QUICK_LINKS = [
  { label: 'Ana Sayfa', href: '#ana-sayfa' },
  { label: 'Canlı Yayın', href: '#canli-yayin' },
  { label: 'DJ Kadrosu', href: '#dj-kadrosu' },
  { label: 'Yayın Akışı', href: '#yayin-akisi' },
]

function SocialLink({ url, label, children }) {
  const baseClasses = 'grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] transition'

  if (!url.trim()) {
    return <span aria-label={`${label} bağlantısı henüz eklenmedi`} role="img" className={`${baseClasses} cursor-not-allowed text-stone-700`}>{children}</span>
  }

  return <a href={url} target="_blank" rel="noreferrer" aria-label={label} className={`${baseClasses} text-stone-400 hover:border-rose-400/20 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-300`}>{children}</a>
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] bg-[#070405] px-4 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div className="max-w-sm">
          <a href="#ana-sayfa" className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">
            <span className="grid size-11 place-items-center rounded-xl bg-rose-800 text-white"><Radio size={21} aria-hidden="true" /></span>
            <span className="text-xl font-bold text-white">{RADIO_CONFIG.name}</span>
          </a>
          <p className="mt-4 text-sm leading-7 text-stone-400">{RADIO_CONFIG.slogan}. Müziğin ve dostluğun en güzel hâli.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Hızlı Bağlantılar</h2>
          <nav className="mt-4 flex flex-col gap-3" aria-label="Footer menüsü">
            {QUICK_LINKS.map((link) => <a key={link.href} href={link.href} className="w-fit text-sm text-stone-400 transition hover:text-rose-200 focus-visible:outline-2 focus-visible:outline-amber-300">{link.label}</a>)}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Bizi Takip Edin</h2>
          <div className="mt-4 flex gap-3">
            <SocialLink url={RADIO_CONFIG.instagramUrl} label="Instagram"><Instagram size={18} aria-hidden="true" /></SocialLink>
            <SocialLink url={RADIO_CONFIG.facebookUrl} label="Facebook"><Facebook size={18} aria-hidden="true" /></SocialLink>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} {RADIO_CONFIG.name}. Tüm hakları saklıdır.</p>
        <p className="flex items-center gap-1.5"><Heart size={12} aria-hidden="true" /> Müzik yayınları ilgili telif haklarına tabidir.</p>
      </div>
    </footer>
  )
}

export default Footer
