const cls = "w-full border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";
const errCls = "mt-1 text-[10px] text-red-500 font-medium ml-2";

function StepLocation({ register, errors }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Location</h2>
        <p className="text-xs text-[#695744] mt-0.5">Coordinates are used for the live weather widget.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={lbl}>Latitude <span className="text-red-400">*</span></label>
          <input
            {...register("latitude")}
            type="number"
            step="any"
            placeholder="30.0444"
            className={`${cls} ${errors.latitude ? 'border-red-500' : 'border-[#d9c9b0]'}`}
          />
          {errors.latitude && <p className={errCls}>{errors.latitude.message}</p>}
        </div>
        <div>
          <label className={lbl}>Longitude <span className="text-red-400">*</span></label>
          <input
            {...register("longitude")}
            type="number"
            step="any"
            placeholder="31.2357"
            className={`${cls} ${errors.longitude ? 'border-red-500' : 'border-[#d9c9b0]'}`}
          />
          {errors.longitude && <p className={errCls}>{errors.longitude.message}</p>}
        </div>
        <div>
          <label className={lbl}>Star Rating</label>
          <input
            {...register("star")}
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="5"
            className={`${cls} ${errors.star ? 'border-red-500' : 'border-[#d9c9b0]'}`}
          />
          {errors.star && <p className={errCls}>{errors.star.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default StepLocation;
