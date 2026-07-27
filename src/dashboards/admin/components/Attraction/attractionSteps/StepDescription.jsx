const cls = "w-full border border-[#d9c9b0] rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";

function StepDescription({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className={lbl}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows="5"
          placeholder="Write a short description for the attraction."
          className={cls}
        />
      </div>
    </div>
  );
}

export default StepDescription;
