import { Plus, Trash2 } from "lucide-react";

const cls =
  "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const lbl = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

/**
 * Step 5 — Experiences
 * Props: form, onChange, onAddExperience, onRemoveExperience, onExperienceChange
 */
function StepExperiences({
  form,
  onChange,
  onAddExperience,
  onRemoveExperience,
  onExperienceChange,
}) {
  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#3f2b1a]">Experiences</h2>
        <p className="text-xs text-[#695744] mt-0.5">
          Add the experiences available at this destination.
        </p>
      </div>

      {/* Experience Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={lbl + " mb-0"}>Experience Items</label>
          <button
            type="button"
            onClick={onAddExperience}
            className="flex items-center gap-1.5 rounded-full border border-[#d9c9b0] px-4 py-1.5 text-xs font-semibold text-[#695744] transition hover:bg-[#f9f3e9] cursor-pointer"
          >
            <Plus size={13} /> Add Item
          </button>
        </div>

        {form.experiences.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-8 text-center text-sm text-stone-400">
            No experiences added yet. Click "Add Item" to start.
          </div>
        ) : (
          <div className="space-y-3">
            {form.experiences.map((ex, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#f1e7d9] bg-[#fdfaf6] p-4 space-y-3"
              >
                {/* ID + Title */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">
                      ID / Slug
                    </label>
                    <input
                      value={ex.id}
                      onChange={(e) =>
                        onExperienceChange(i, "id", e.target.value)
                      }
                      placeholder="alex-qaitbay"
                      className={cls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">
                      Title
                    </label>
                    <input
                      value={ex.title}
                      onChange={(e) =>
                        onExperienceChange(i, "title", e.target.value)
                      }
                      placeholder="Citadel of Qaitbay"
                      className={cls}
                    />
                  </div>
                </div>
                {/* Image + Category */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">
                      Image URL
                    </label>
                    <input
                      value={ex.image}
                      onChange={(e) =>
                        onExperienceChange(i, "image", e.target.value)
                      }
                      placeholder="https://example.com/exp.jpg"
                      className={cls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#695744] mb-1">
                      Category
                    </label>
                    <input
                      value={ex.category}
                      onChange={(e) =>
                        onExperienceChange(i, "category", e.target.value)
                      }
                      placeholder="Historical Sites"
                      className={cls}
                    />
                  </div>
                </div>
                {/* Description + Delete */}
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#695744] mb-1">
                      Description
                    </label>
                    <input
                      value={ex.description}
                      onChange={(e) =>
                        onExperienceChange(i, "description", e.target.value)
                      }
                      placeholder="Short description of this experience..."
                      className={cls}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveExperience(i)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                    title="Remove"
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
