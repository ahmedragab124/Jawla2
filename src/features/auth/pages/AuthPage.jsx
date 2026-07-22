import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeForRole } from '../services/authStorage';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../../supabase';
import AuthFormFields from '../components/AuthFormFields';
import gsap from 'gsap';

// AuthPage Component
function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', role: 'Tourist' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const cardRef = useRef(null);
  const formRef = useRef(null);

  // Triggers initial card entry animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Switches between Login and Sign Up tabs
  const handleTabChange = (newMode) => {
    setMode(newMode);
    setMessage('');
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  };

  // Input change handler
  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  // Form submission handler for login and signup operations
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (mode === 'signup' && !form.name)) return setMessage('Please fill in all required fields.');
    if (mode === 'signup' && form.password !== form.confirmPassword) return setMessage('Passwords do not match.');

    setIsSubmitting(true);
    try {
      const { data: users, error: usersError } = await supabase.from('users').select('*');
      if (usersError) throw usersError;

      if (mode === 'login') {
        const user = users.find((u) => u.email === form.email && u.password === form.password);
        if (!user) return setMessage('Invalid email or password.');
        login(user);
        navigate(homeForRole(user.role));
        return;
      }

      if (users.some((u) => u.email === form.email)) return setMessage('This email is already registered.');

      const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
      const newUser = { id, name: form.name, email: form.email, password: form.password, role: form.role };

      const { data: createdUser, error: createError } = await supabase.from('users').insert(newUser).select().single();
      if (createError) throw createError;

      if (form.role === 'Tour Guide') {
        const guideId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
        await supabase.from('tourGuides').insert({
          id: guideId,
          userId: createdUser.id,
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone || '',
          whatsapp: form.phone || '',
          status: 'Pending approval',
        });
      }

      login(createdUser);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Could not connect to Supabase. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#f7ebe0] to-[#fffaf0] px-5 py-20 flex items-center justify-center">
      <section ref={cardRef} className="w-full max-w-md rounded-4xl bg-white p-8 shadow-[0_30px_90px_rgba(76,48,24,0.16)] border border-[#f3e6d3]">
        <p className="text-center text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">JAWLA</p>
        <h1 className="mt-2 text-center text-3xl font-black text-[#3f2b1a]">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>

        <div className="mt-7 grid grid-cols-2 rounded-2xl bg-[#f8f1e6] p-1.5 shadow-inner">
          {['login', 'signup'].map((tab) => (
            <button key={tab} type="button" onClick={() => handleTabChange(tab)} className={`rounded-xl py-2.5 font-bold text-sm transition-all duration-300 cursor-pointer ${mode === tab ? 'bg-white text-[#7a5540] shadow-md' : 'text-[#806c56] hover:text-[#3f2b1a]'}`}>
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form ref={formRef} className="mt-7 space-y-5" onSubmit={submit}>
          <AuthFormFields mode={mode} form={form} onChange={updateField} />
          {message && <p className="rounded-2xl bg-red-50 p-3.5 text-xs font-bold text-red-700 border border-red-200">{message}</p>}
          <button disabled={isSubmitting} className="w-full rounded-2xl bg-[#7a5540] py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#5c4033] cursor-pointer">
            {isSubmitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-medium text-[#6d5c4a]">Demo admin: <strong>admin@jawla.com</strong> / <strong>admin123</strong></p>
      </section>
    </main>
  );
}

export default AuthPage;
