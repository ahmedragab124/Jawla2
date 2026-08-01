const cls = "w-full border rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";
const errCls = "mt-1 text-[10px] text-red-500 font-medium ml-2";

function StepIdentity({ register, errors, destinations }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Attraction ID</label>
          <input 
            {...register("id")} 
            type="text" 
            placeholder="cairo-pyramids" 
            className={`${cls} ${errors.id ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
          />
          {errors.id && <p className={errCls}>{errors.id.message}</p>}
        </div>
        <div>
          <label className={lbl}>Attraction Name</label>
          <input 
            {...register("name")} 
            type="text" 
            placeholder="Example: Giza Pyramids" 
            className={`${cls} ${errors.name ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
          />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Destination</label>
          <select 
            {...register("destinationId")} 
            className={`${cls} ${errors.destinationId ? 'border-red-500' : 'border-[#d9c9b0]'}`}
          >
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.destinationId && <p className={errCls}>{errors.destinationId.message}</p>}
        </div>
        <div>
          <label className={lbl}>Category</label>
          <input 
            {...register("category")} 
            type="text" 
            placeholder="Historical / Museum / Outdoor" 
            className={`${cls} ${errors.category ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
          />
          {errors.category && <p className={errCls}>{errors.category.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default StepIdentity;
