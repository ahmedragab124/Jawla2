import { LockKeyhole, Mail, UserRound, Phone, Eye, EyeOff, Compass, ShieldCheck } from "lucide-react";
import { useState } from "react";

function AuthFormFields({ mode, form, onChange, onSelectRole }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      {/* Full Name (Sign Up only) */}
      {mode === "signup" && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <UserRound className="absolute left-4 top-3.5 h-5 w-5 text-[#b57a2d]" />
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="w-full rounded-2xl border border-[#e6d8c5] bg-[#fffdfa] px-4 py-3 pl-12 text-sm font-medium text-[#3f2b1a] outline-none transition-all focus:border-[#b57a2d] focus:bg-white focus:ring-4 focus:ring-[#b57a2d]/10"
              placeholder="e.g. Ahmed Ragab"
            />
          </div>
        </div>
      )}

      {/* Email Address */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-3.5 h-5 w-5 text-[#b57a2d]" />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full rounded-2xl border border-[#e6d8c5] bg-[#fffdfa] px-4 py-3 pl-12 text-sm font-medium text-[#3f2b1a] outline-none transition-all focus:border-[#b57a2d] focus:bg-white focus:ring-4 focus:ring-[#b57a2d]/10"
            placeholder="name@example.com"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-1.5">
          Password
        </label>
        <div className="relative">
          <LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-[#b57a2d]" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
            className="w-full rounded-2xl border border-[#e6d8c5] bg-[#fffdfa] px-4 py-3 pl-12 pr-12 text-sm font-medium text-[#3f2b1a] outline-none transition-all focus:border-[#b57a2d] focus:bg-white focus:ring-4 focus:ring-[#b57a2d]/10"
            placeholder="At least 6 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-[#a88762] hover:text-[#3f2b1a] transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Sign Up extra fields */}
      {mode === "signup" && (
        <>
          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-[#b57a2d]" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={onChange}
                required
                minLength={6}
                className="w-full rounded-2xl border border-[#e6d8c5] bg-[#fffdfa] px-4 py-3 pl-12 pr-12 text-sm font-medium text-[#3f2b1a] outline-none transition-all focus:border-[#b57a2d] focus:bg-white focus:ring-4 focus:ring-[#b57a2d]/10"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-[#a88762] hover:text-[#3f2b1a] transition cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Account Type Role Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onSelectRole("Tourist")}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer ${
                  form.role === "Tourist"
                    ? "border-[#b57a2d] bg-[#fdf8f0] text-[#b57a2d] shadow-sm scale-[1.02]"
                    : "border-[#e6d8c5] bg-white text-[#695744] hover:bg-[#fff9f0]"
                }`}
              >
                <UserRound size={16} />
                <span>Tourist</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectRole("Tour Guide")}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 font-bold text-xs transition-all cursor-pointer ${
                  form.role === "Tour Guide"
                    ? "border-[#b57a2d] bg-[#fdf8f0] text-[#b57a2d] shadow-sm scale-[1.02]"
                    : "border-[#e6d8c5] bg-white text-[#695744] hover:bg-[#fff9f0]"
                }`}
              >
                <Compass size={16} />
                <span>Tour Guide</span>
              </button>
            </div>
          </div>

          {/* Phone / WhatsApp (If Tour Guide) */}
          {form.role === "Tour Guide" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3f2b1a] mb-1.5">
                Phone / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-[#b57a2d]" />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  required
                  className="w-full rounded-2xl border border-[#e6d8c5] bg-[#fffdfa] px-4 py-3 pl-12 text-sm font-medium text-[#3f2b1a] outline-none transition-all focus:border-[#b57a2d] focus:bg-white focus:ring-4 focus:ring-[#b57a2d]/10"
                  placeholder="e.g. +20 101 234 5678"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AuthFormFields;
