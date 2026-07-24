import { useState } from 'react';
import { Mail, Phone, Globe2, Pencil } from 'lucide-react';
import TouristProfileEditForm from './TouristProfileEditForm';
import { supabase } from '../../../supabase';

// TouristProfileSidebar Component
function TouristProfileSidebar({ user, bookings, onUserUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    avatar: user.avatar || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      return setError('Please choose an image smaller than 2 MB.');
    }
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    if (!name || !email) return setError('Name and email are required.');

    setSaving(true);
    setError('');
    try {
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update({ name, email, phone: form.phone.trim(), location: form.location.trim(), bio: form.bio.trim(), avatar: form.avatar })
        .eq('id', user.id)
        .select()
        .single();

      if (userError) throw userError;

      const affectedBookings = bookings.filter((b) => b.touristId === user.id || b.touristEmail === user.email);
      await Promise.all(affectedBookings.map(async (b) => {
        await supabase.from('bookings').update({ touristName: name, touristEmail: email, email, phone: form.phone.trim() }).eq('id', b.id);
      }));

      onUserUpdated(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError('Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 sticky top-24">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-[#f9ecd8] text-2xl font-black text-[#7a5540] ring-4 ring-white shadow-lg">
        {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : user.name?.trim().charAt(0).toUpperCase() || 'T'}
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Account</p>
          <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>
        </div>
        {!isEditing && (
          <button onClick={() => { setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', location: user.location || '', bio: user.bio || '', avatar: user.avatar || '' }); setError(''); setIsEditing(true); }} className="rounded-xl border border-[#e6d8c5] p-2 text-[#b57a2d] hover:bg-[#fff7ea] cursor-pointer">
            <Pencil size={17} />
          </button>
        )}
      </div>

      {isEditing ? (
        <TouristProfileEditForm form={form} saving={saving} error={error} onChange={handleChange} onPhotoChange={handlePhotoChange} onSave={handleSave} onCancel={() => { setIsEditing(false); setError(''); }} />
      ) : (
        <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
          <div className="flex items-center gap-3"><Mail className="text-[#b57a2d]" size={18} /><span>{user.email}</span></div>
          {user.phone && <div className="flex items-center gap-3"><Phone className="text-[#b57a2d]" size={18} /><span>{user.phone}</span></div>}
          <div className="flex items-center gap-3"><Globe2 className="text-[#b57a2d]" size={18} /><span>{user.location || 'Tourist Member'}</span></div>
          {user.bio && <p className="rounded-2xl bg-[#fffaf0] p-3 text-xs text-[#6d5c4a]">{user.bio}</p>}
        </div>
      )}
    </section>
  );
}

export default TouristProfileSidebar;
