import { useEffect, useState } from 'react'
import axios from 'axios'
import { UsersRound, UserRoundCheck } from 'lucide-react'

function AdminDashboard() {
  const [tourists, setTourists] = useState([])
  const [tourGuides, setTourGuides] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/users'),
      axios.get('http://localhost:3000/tourGuides'),
    ])
      .then(([usersRes, guidesRes]) => {
        setTourists(usersRes.data.filter(user => user.role === 'Tourist'))
        setTourGuides(guidesRes.data)
      })
      .catch((error) => {
        console.error('Failed to load dashboard data:', error)
      })
  }, [])


  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-[0.25em] text-[#b57a2d]">ADMIN DASHBOARD</p>
        <h1 className="mt-3 text-4xl font-extrabold text-[#3f2b1a]">Tourism overview</h1>
        <p className="mt-3 text-[#695744]">Manage the tourists and tour guides registered in the platform.</p>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.1)]">
            <UsersRound className="h-8 w-8 text-[#b57a2d]" />
            <p className="mt-5 text-sm font-semibold text-[#76624d]">Total tourists</p>
            <p className="mt-1 text-5xl font-extrabold text-[#3f2b1a]">{tourists.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.1)]">
            <UserRoundCheck className="h-8 w-8 text-[#b57a2d]" />
            <p className="mt-5 text-sm font-semibold text-[#76624d]">Total tour guides</p>
            <p className="mt-1 text-5xl font-extrabold text-[#3f2b1a]">{tourGuides.length}</p>
          </div>
        </div>


        <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.1)]">
          <div className="border-b border-stone-100 p-6"><h2 className="text-2xl font-bold text-[#3f2b1a]">Tourists</h2></div>
          <div className="overflow-x-auto">
            <table className='w-full min-w-130 text-left text-sm'>
              <thead className="bg-[#f9f3e9] text-[#725a40]"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th></tr></thead>
              <tbody>{tourists.map((tourist) => <tr key={tourist.id} className="border-t border-stone-100"><td className="p-4 font-medium">{tourist.name}</td><td className="p-4">{tourist.email}</td><td className="p-4">Tourist</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.1)]">
          <div className="border-b border-stone-100 p-6"><h2 className="text-2xl font-bold text-[#3f2b1a]">Tour guides</h2></div>
          <div className="overflow-x-auto">
            <table className='w-full min-w-130 text-left text-sm'>
              <thead className="bg-[#f9f3e9] text-[#725a40]"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Status</th></tr></thead>
              <tbody>{tourGuides.map((guide) => <tr key={guide.id} className="border-t border-stone-100"><td className="p-4 font-medium">{guide.name}</td><td className="p-4">{guide.email}</td><td className="p-4"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{guide.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard
