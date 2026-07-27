const cls = "w-full border border-[#d9c9b0] rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";

function StepIdentity({ form, onChange, destinations }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Attraction ID</label>
          <input name="id" value={form.id} onChange={onChange} type="text" placeholder="cairo-pyramids" className={cls} />
        </div>
        <div>
          <label className={lbl}>Attraction Name</label>
          <input name="name" value={form.name} onChange={onChange} type="text" placeholder="Example: Giza Pyramids" className={cls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Destination</label>
          <select name="destinationId" value={form.destinationId} onChange={onChange} className={cls}>
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>Category</label>
          <input name="category" value={form.category} onChange={onChange} type="text" placeholder="Historical / Museum / Outdoor" className={cls} />
        </div>
      </div>
    </div>
  );
}

export default StepIdentity;
