import { Plus, Trash2 } from "lucide-react";

const cls = "w-full border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";
const errCls = "mt-1 text-[10px] text-red-500 font-medium ml-2";

function StepExperiences({ register, errors, fields, append, remove }) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Experiences</h2>
        <p className="text-xs text-[#695744] mt-0.5">Add the experiences available at this destination.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={lbl + " mb-0"}>Experience Items</label>
          <button
            type="button"
            onClick={() => append({ id: "", image: "", title: "", category: "", description: "" })}
            className="flex items-center gap-1.5 rounded-full border border-[#d9c9b0] px-4 py-1.5 text-xs font-semibold text-[#695744] transition hover:bg-[#f9f3e9] cursor-pointer"
          >
            <Plus size={13} /> Add Item
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-8 text-center text-sm text-stone-400">
            No experiences added yet. Click "Add Item" to start.
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, i) => (
              <div key={field.id} className="rounded-2xl border border-[#f1e7d9] bg-[#fdfaf6] p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">ID / Slug</label>
                    <input 
                      {...register(`experiences.${i}.id`)} 
                      placeholder="alex-qaitbay" 
                      className={`${cls} ${errors.experiences?.[i]?.id ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
                    />
                    {errors.experiences?.[i]?.id && <p className={errCls}>{errors.experiences[i].id.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">Title</label>
                    <input 
                      {...register(`experiences.${i}.title`)} 
                      placeholder="Citadel of Qaitbay" 
                      className={`${cls} ${errors.experiences?.[i]?.title ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
                    />
                    {errors.experiences?.[i]?.title && <p className={errCls}>{errors.experiences[i].title.message}</p>}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">Image URL</label>
                    <input 
                      {...register(`experiences.${i}.image`)} 
                      placeholder="https://example.com/exp.jpg" 
                      className={`${cls} ${errors.experiences?.[i]?.image ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
                    />
                    {errors.experiences?.[i]?.image && <p className={errCls}>{errors.experiences[i].image.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">Category</label>
                    <input 
                      {...register(`experiences.${i}.category`)} 
                      placeholder="Historical Sites" 
                      className={`${cls} ${errors.experiences?.[i]?.category ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
                    />
                    {errors.experiences?.[i]?.category && <p className={errCls}>{errors.experiences[i].category.message}</p>}
                  </div>
                </div>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#695744] mb-1">Description</label>
                    <input 
                      {...register(`experiences.${i}.description`)} 
                      placeholder="Short description..." 
                      className={cls} 
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StepExperiences;
