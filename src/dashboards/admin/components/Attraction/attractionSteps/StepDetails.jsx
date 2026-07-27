const cls =
  "w-full border border-[#d9c9b0] rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";

function StepDetails({ form, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={lbl}>Duration (min)</label>
          <input
            name="duration"
            value={form.duration}
            onChange={onChange}
            type="number"
            min="0"
            placeholder="90"
            className={cls}
          />
        </div>
        <div>
          <label className={lbl}>Best Time</label>
          <select
            name="bestTime"
            value={form.bestTime}
            onChange={onChange}
            className={cls}
          >
            <option value="Anytime">Anytime</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Star Rating</label>
          <input
            name="star"
            value={form.star}
            onChange={onChange}
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="5"
            className={cls}
          />
        </div>
      </div>
    </div>
  );
}

export default StepDetails;
