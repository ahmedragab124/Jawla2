import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, Star } from 'lucide-react'

function AttractionsPage() {
  const [attractions, setAttractions] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/attractions')
      .then(res => setAttractions(res.data))
      .catch((error) => {
        console.error('Failed to load destinations:', error)
      })
  }, [])

  const filtered = attractions.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#3f2b1a] md:text-6xl">All Attractions</h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <label className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#a57e55]" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-full border border-[#e6d8c5] bg-white py-3 pl-12 pr-5 outline-none focus:border-[#b57a2d]" />
          </label>

        </div>


        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(a => (
            <article key={a.id} className="overflow-hidden rounded-[28px] bg-white shadow-lg hover:-translate-y-2 transition">
              <img src={a.image} alt={a.name} className="h-60 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-bold text-[#3f2b1a]">{a.name}</h2>
                  <span className="flex items-center gap-1 rounded-full bg-[#fff2d9] px-2.5 py-1 text-xs font-bold text-[#a9681b]">
                    <Star size={14} fill="currentColor" /> {a.star}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#685743]">{a.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AttractionsPage
