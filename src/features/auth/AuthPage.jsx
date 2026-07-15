import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { homeForRole, saveCurrentUser } from './authStorage'


function AuthPage() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Tourist' })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password || (mode === 'signup' && !form.name)) {
      setMessage('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const { data: users } = await axios.get('http://localhost:3000/users')

      if (mode === 'login') {
        const user = users.find(u => u.email === form.email && u.password === form.password)
        if (!user) {
          setMessage('Invalid email or password.')
          return
        }
        saveCurrentUser(user)
        navigate(homeForRole(user.role))
        return
      }

      if (users.some(u => u.email === form.email)) {
        setMessage('This email is already registered.')
        return
      }

      const newUser = { name: form.name, email: form.email, password: form.password, role: form.role }
      const { data: createdUser } = await axios.post('http://localhost:3000/users', newUser)

      if (form.role === 'Tour Guide') {
        await axios.post('http://localhost:3000/tourGuides', {
          userId: createdUser.id,
          name: form.name,
          email: form.email,
          status: 'Pending approval',
        })
      }

      saveCurrentUser(createdUser)
      navigate('/profile')
    } catch {
      setMessage('Could not contact the API. Run npm.cmd run server first.')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-16">
      <section className="mx-auto max-w-md rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(76,48,24,0.16)]">
        <p className="text-center text-sm font-bold tracking-[0.25em] text-[#b57a2d]">JAWLA</p>
        <h1 className="mt-3 text-center text-3xl font-extrabold text-[#3f2b1a]">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>

        <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#f8f1e6] p-1">
          {['login', 'signup'].map((tab) => (
            <button key={tab} type="button" onClick={() => { setMode(tab); setMessage('') }} className={`rounded-lg py-2 font-semibold transition ${mode === tab ? 'bg-white text-[#7a5540] shadow-sm' : 'text-[#806c56]'}`}>
              {tab === 'login' ? 'Login' : 'Sign up'}
            </button>
          ))}
        </div>

        <form className="mt-7 space-y-5" onSubmit={submit}>
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-2 block font-medium text-[#4e3b28]">Full name</span>
              <span className="relative block"><UserRound className="absolute left-3 top-3.5 h-5 w-5 text-[#a88762]" /><input name="name" value={form.name} onChange={updateField} className='w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d]' placeholder="Your name" /></span>
            </label>
          )}

          <label className="block">
            <span className="mb-2 block font-medium text-[#4e3b28]">Email</span>
            <span className="relative block"><Mail className="absolute left-3 top-3.5 h-5 w-5 text-[#a88762]" /><input name="email" type="email" value={form.email} onChange={updateField} className='w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d]' placeholder="name@example.com" /></span>
          </label>

          <label className="block">
            <span className="mb-2 block font-medium text-[#4e3b28]">Password</span>
            <span className="relative block"><LockKeyhole className="absolute left-3 top-3.5 h-5 w-5 text-[#a88762]" /><input name="password" type="password" value={form.password} onChange={updateField} className='w-full rounded-xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d]' placeholder="At least 8 characters" minLength="8" /></span>
          </label>

          {mode === 'signup' && (
            <label className="block">
              <span className="mb-2 block font-medium text-[#4e3b28]">Account type</span>
              <select name="role" value={form.role} onChange={updateField} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-[#b57a2d]">
                <option value="Tourist">Tourist</option>
                <option value="Tour Guide">Tour Guide</option>
              </select>
            </label>
          )}

          {message && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}
          <button disabled={isSubmitting} className="w-full rounded-xl bg-[#7a5540] py-3 font-bold text-white transition hover:bg-[#5c4033] disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6d5c4a]">Demo admin: <strong>admin@jawla.com</strong> / <strong>admin123</strong></p>
      </section>
    </main>
  )
}

export default AuthPage
