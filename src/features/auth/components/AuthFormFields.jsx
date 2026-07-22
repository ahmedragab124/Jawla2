import { LockKeyhole, Mail, UserRound, Phone } from 'lucide-react';

// AuthFormFields Component
function AuthFormFields({ mode, form, onChange }) {
  return (
    <>
      {mode === 'signup' && (
        <label className="block">
          <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Full name</span>
          <span className="relative block">
            <UserRound className="absolute left-3.5 top-3.5 h-5 w-5 text-[#a88762]" />
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d] text-sm font-medium"
              placeholder="Your full name"
            />
          </span>
        </label>
      )}

      <label className="block">
        <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Email address</span>
        <span className="relative block">
          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-[#a88762]" />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d] text-sm font-medium"
            placeholder="name@example.com"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Password</span>
        <span className="relative block">
          <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-[#a88762]" />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d] text-sm font-medium"
            placeholder="At least 8 characters"
            minLength="8"
          />
        </span>
      </label>

      {mode === 'signup' && (
        <>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Confirm password</span>
            <span className="relative block">
              <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-[#a88762]" />
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={onChange}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d] text-sm font-medium"
                placeholder="Re-enter password"
                minLength="8"
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Account type</span>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-[#b57a2d] text-sm font-bold text-[#3f2b1a]"
            >
              <option value="Tourist">Tourist</option>
              <option value="Tour Guide">Tour Guide</option>
            </select>
          </label>
        </>
      )}

      {mode === 'signup' && form.role === 'Tour Guide' && (
        <label className="block">
          <span className="mb-2 block text-xs font-bold text-[#4e3b28]">Phone / WhatsApp</span>
          <span className="relative block">
            <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-[#a88762]" />
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 pl-11 outline-none transition focus:border-[#b57a2d] text-sm font-medium"
              placeholder="e.g. 01012345678"
            />
          </span>
        </label>
      )}
    </>
  );
}

export default AuthFormFields;
