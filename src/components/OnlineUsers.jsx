import { Crown, Headphones, Radio, Users } from 'lucide-react'
import { DEMO_USERS } from '../data/demoUsers.js'

const GROUPS = [
  { role: 'Yönetici', icon: Crown },
  { role: 'DJ', icon: Radio },
  { role: 'Dinleyici', icon: Headphones },
]

function OnlineUsers() {
  return (
    <section aria-labelledby="online-users-title" className="border border-white/[0.09] bg-[#0e080a]">
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#160a0f] px-4 py-3.5">
        <h2 id="online-users-title" className="flex items-center gap-2 font-semibold text-white"><Users size={18} className="text-rose-400" aria-hidden="true" /> Online Üyeler</h2>
        <span className="border border-white/10 px-2 py-1 text-xs text-stone-400">Demo</span>
      </div>
      <div className="max-h-[390px] overflow-y-auto p-4" aria-label="Demo online kullanıcı listesi" tabIndex="0">
        {GROUPS.map(({ role, icon: Icon }) => {
          const users = DEMO_USERS.filter((user) => user.role === role)
          if (users.length === 0) return null

          return (
            <div key={role} className="mb-5 last:mb-0">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-400"><Icon size={13} aria-hidden="true" /> {role}</h3>
              <div className="space-y-1">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 px-2 py-2.5 transition hover:bg-white/[0.035]">
                    <span className="relative grid size-9 shrink-0 place-items-center bg-rose-950 text-xs font-bold text-rose-200">
                      {user.avatar}
                      <span role="img" className="absolute -bottom-0.5 -right-0.5 size-2.5 border-2 border-[#0e080a] bg-emerald-400" aria-label={user.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'} />
                    </span>
                    <div className="min-w-0"><p className="truncate text-sm font-medium text-stone-200">{user.username}</p><p className="text-xs text-stone-400">{user.role}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <p className="border-t border-white/[0.08] px-4 py-3 text-xs leading-5 text-stone-400">Sistem henüz gerçek kullanıcı bağlantısı kullanmıyor.</p>
    </section>
  )
}

export default OnlineUsers
