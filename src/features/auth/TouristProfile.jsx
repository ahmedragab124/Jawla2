import { Navigate } from 'react-router-dom'
import { Mail, MapPin, UserRound } from 'lucide-react'
import { getCurrentUser } from './authStorage'

function TouristProfile() {
  const user = getCurrentUser()

  if (!user) return <Navigate to="/auth" replace />

  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-16">
      <section className="mx-auto max-w-xl rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(76,48,24,0.14)]">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f9ecd8] text-[#7a5540]"><UserRound size={38} /></div>
        <p className="mt-7 text-sm font-bold tracking-[0.22em] text-[#b57a2d]">{user.role.toUpperCase()} PROFILE</p>
        <h1 className="mt-3 text-4xl font-extrabold text-[#3f2b1a]">{user.name || 'Explore Egypt guest'}</h1>
        <p className="mt-4 text-[#6d5c4a]">Your account is ready. Start exploring destinations and book a guide whenever you are ready.</p>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6 text-[#594735]">
          <div className="flex items-center gap-3"><Mail className="text-[#b57a2d]" size={20} /><span>{user.email}</span></div>
          <div className="flex items-center gap-3"><MapPin className="text-[#b57a2d]" size={20} /><span>Explore Egypt member</span></div>
        </div>
      </section>
    </main>
  )
}

export default TouristProfile
