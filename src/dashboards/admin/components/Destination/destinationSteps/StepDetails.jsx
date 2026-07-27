const cls = "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

function StepDetails({ form, onChange }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Description & History</h2>
        <p className="text-xs text-[#695744] mt-0.5">Tell visitors what makes this place special.</p>
      </div>

      <div>
        <label className={lbl}>Description <span className="text-red-400">*</span></label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows="4"
          placeholder="A short, compelling description of the destination..."
          className={cls}
        />
      </div>

      <div>
        <label className={lbl}>History</label>
        <input name="history" value={form.history} onChange={onChange} placeholder="e.g. 5000+ Years" className={cls} />
        <p className="mt-1 text-xs text-stone-400">
          Displayed in the heritage info panel on the destination page.
        </p>
      </div>
    </div>
  );
}

export default StepDetails;
