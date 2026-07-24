import { ImagePlus, Save, X } from 'lucide-react';

// TouristProfileEditForm Component
function TouristProfileEditForm({ form, saving, error, onChange, onPhotoChange, onSave, onCancel }) {
  return (
    <form onSubmit={onSave} className="mt-6 space-y-4 border-t border-stone-100 pt-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#f9ecd8] font-black text-[#7a5540]">
          {form.avatar ? <img src={form.avatar} alt="Profile preview" className="h-full w-full object-cover" /> : form.name.trim().charAt(0).toUpperCase() || 'T'}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#e6d8c5] px-3 py-2 text-sm font-bold text-[#b57a2d] transition hover:bg-[#fff7ea]">
          <ImagePlus size={16} /> Upload photo
          <input type="file" accept="image/*" onChange={onPhotoChange} className="sr-only" />
        </label>
      </div>

      <label className="block text-sm font-semibold text-[#594735]">
        Full name
        <input name="name" value={form.name} onChange={onChange} className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
      </label>

      <label className="block text-sm font-semibold text-[#594735]">
        Email address
        <input name="email" type="email" value={form.email} onChange={onChange} className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
      </label>

      <label className="block text-sm font-semibold text-[#594735]">
        City / country
        <input name="location" value={form.location} onChange={onChange} placeholder="Cairo, Egypt" className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
      </label>

      <label className="block text-sm font-semibold text-[#594735]">
        About me
        <textarea name="bio" value={form.bio} onChange={onChange} maxLength={180} rows={3} placeholder="Tell us a little about your travel style..." className="mt-1.5 w-full resize-none rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
      </label>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl bg-[#b57a2d] px-3 py-2 text-sm font-bold text-white disabled:opacity-60 cursor-pointer">
          <Save size={15} />{saving ? 'Saving...' : 'Save changes'}
        </button>
        <button type="button" onClick={onCancel} className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-bold text-stone-600 cursor-pointer">
          <X size={15} />Cancel
        </button>
      </div>
    </form>
  );
}

export default TouristProfileEditForm;
