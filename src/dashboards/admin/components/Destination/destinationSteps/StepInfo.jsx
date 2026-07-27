const cls = "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

function StepInfo({ form, onChange }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Basic Info</h2>
        <p className="text-xs text-[#695744] mt-0.5">Set the core identity of this destination.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>
            Name <span className="text-red-400">*</span>
          </label>
          <input name="name" value={form.name} onChange={onChange} placeholder="e.g. Cairo" className={cls} />
        </div>
        <div>
          <label className={lbl}>
            Destination ID <span className="text-red-400">*</span>
            <span className="ml-1 text-[10px] text-stone-400 font-normal">(slug, e.g. cairo)</span>
          </label>
          <input name="id" value={form.id} onChange={onChange} placeholder="cairo" className={cls} />
        </div>
      </div>

      <div>
        <label className={lbl}>Weather Label</label>
        <input name="weatherLabel" value={form.weatherLabel} onChange={onChange} placeholder="Hot & Sunny" className={cls} />
      </div>
    </div>
  );
}

export default StepInfo;
