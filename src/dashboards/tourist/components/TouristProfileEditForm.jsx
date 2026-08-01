import { ImagePlus, Save, X } from "lucide-react";

function TouristProfileEditForm({
  register,
  errors,
  avatarValue,
  nameValue,
  saving,
  onPhotoChange,
  onSave,
  onCancel,
}) {
  const errCls = "mt-1 text-[10px] text-red-500 font-medium";

  return (
    <form onSubmit={onSave} className="mt-6 space-y-4 border-t border-stone-100 pt-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#f9ecd8] font-black text-[#7a5540]">
          {avatarValue ? (
            <img src={avatarValue} alt="Profile preview" className="h-full w-full object-cover" />
          ) : (
            nameValue?.trim().charAt(0).toUpperCase() || "T"
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#e6d8c5] px-3 py-2 text-sm font-bold text-[#b57a2d] transition hover:bg-[#fff7ea]">
          <ImagePlus size={16} /> Upload photo
          <input type="file" accept="image/*" onChange={onPhotoChange} className="sr-only" />
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#594735]">Full name</label>
        <input
          {...register("name")}
          className={`mt-1.5 w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#e6d8c5]'} px-3 py-2.5 outline-none focus:border-[#b57a2d]`}
        />
        {errors.name && <p className={errCls}>{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#594735]">Email address</label>
        <input
          type="email"
          {...register("email")}
          className={`mt-1.5 w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#e6d8c5]'} px-3 py-2.5 outline-none focus:border-[#b57a2d]`}
        />
        {errors.email && <p className={errCls}>{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#594735]">City / country</label>
        <input
          {...register("location")}
          placeholder="Cairo, Egypt"
          className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#594735]">About me</label>
        <textarea
          {...register("bio")}
          rows={3}
          placeholder="Tell us a little about your travel style..."
          className={`mt-1.5 w-full resize-none rounded-xl border ${errors.bio ? 'border-red-500' : 'border-[#e6d8c5]'} px-3 py-2.5 outline-none focus:border-[#b57a2d]`}
        />
        {errors.bio && <p className={errCls}>{errors.bio.message}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#b57a2d] px-3 py-2 text-sm font-bold text-white disabled:opacity-60 cursor-pointer"
        >
          <Save size={15} />
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-bold text-stone-600 cursor-pointer"
        >
          <X size={15} />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TouristProfileEditForm;
