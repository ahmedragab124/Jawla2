const cls = "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

function StepImages({ form, onChange }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Images & Hero</h2>
        <p className="text-xs text-[#695744] mt-0.5">Provide the visual identity of this destination.</p>
      </div>

      <div>
        <label className={lbl}>Hero Image URL <span className="text-red-400">*</span></label>
        <input name="heroImage" value={form.heroImage} onChange={onChange} placeholder="https://example.com/cairo-hero.jpg" className={cls} />
        {form.heroImage && (
          <img src={form.heroImage} alt="hero preview" className="mt-3 h-36 w-full rounded-2xl object-cover border border-stone-100 shadow-sm" onError={(e) => (e.target.style.display = "none")} />
        )}
      </div>

      <div>
        <label className={lbl}>Card Image URL <span className="text-red-400">*</span></label>
        <input name="image" value={form.image} onChange={onChange} placeholder="https://example.com/cairo-card.jpg" className={cls} />
        {form.image && (
          <img src={form.image} alt="card preview" className="mt-3 h-28 w-48 rounded-2xl object-cover border border-stone-100 shadow-sm" onError={(e) => (e.target.style.display = "none")} />
        )}
      </div>

      <div>
        <label className={lbl}>Hero Title</label>
        <input name="heroTitle" value={form.heroTitle} onChange={onChange} placeholder="Discover the Heart of Egypt" className={cls} />
      </div>
    </div>
  );
}

export default StepImages;
