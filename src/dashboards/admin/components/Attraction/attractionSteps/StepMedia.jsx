const cls = "w-full border border-[#d9c9b0] rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";

function StepMedia({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className={lbl}>Image URL</label>
        <input name="image" value={form.image} onChange={onChange} placeholder="https://example.com/image.jpg" className={cls} />
      </div>
    </div>
  );
}

export default StepMedia;
