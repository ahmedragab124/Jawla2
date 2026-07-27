const cls = "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

function StepLocation({ form, onChange }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Location</h2>
        <p className="text-xs text-[#695744] mt-0.5">
          Coordinates are used for the live weather widget.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Latitude <span className="text-red-400">*</span></label>
          <input name="latitude" value={form.latitude} onChange={onChange} type="number" step="any" placeholder="30.0444" className={cls} />
        </div>
        <div>
          <label className={lbl}>Longitude <span className="text-red-400">*</span></label>
          <input name="longitude" value={form.longitude} onChange={onChange} type="number" step="any" placeholder="31.2357" className={cls} />
        </div>
      </div>
    </div>
  );
}

export default StepLocation;
