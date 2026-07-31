import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { supabase } from "../../../../supabase";

const inputClass =
  "w-full border border-[#d9c9b0] rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const labelClass = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    weatherLabel: "",
    heroImage: "",
    image: "",
    heroTitle: "",
    description: "",
    history: "",
    latitude: "",
    longitude: "",
    star: "",
    experiences: [], // [{ id, image, title, category, description }]
  });

  // ── Load ──────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Failed to load destination");
        setLoading(false);
        return;
      }

      setForm({
        name: data.name || "",
        weatherLabel: data.weatherLabel || "",
        heroImage: data.heroImage || "",
        image: data.image || "",
        heroTitle: data.heroTitle || "",
        description: data.description || "",
        history: data.history || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        star: data.star || "",
        experiences: Array.isArray(data.experiences) ? data.experiences : [],
      });
      setLoading(false);
    };
    load();
  }, [id]);

  // ── Handlers ──────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () =>
    setForm((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: "", image: "", title: "", category: "" },
      ],
    }));

  const removeExperience = (i) =>
    setForm((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, idx) => idx !== i),
    }));

  const handleExpChange = (i, field, value) =>
    setForm((prev) => {
      const updated = [...prev.experiences];
      updated[i] = { ...updated[i], [field]: value };
      return { ...prev, experiences: updated };
    });

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.heroImage.trim() ||
      !form.image.trim()
    )
      return toast.error(
        "Name, Description, Hero Image, and Card Image are required.",
      );

    const cleanedExperiences = form.experiences.filter(
      (ex) => ex.id?.trim() && ex.image?.trim(),
    );

    setSaving(true);

    try {
      const updateData = {
        name: form.name.trim(),
        weatherLabel: form.weatherLabel.trim() || null,
        heroImage: form.heroImage.trim(),
        image: form.image.trim(),
        heroTitle: form.heroTitle.trim() || form.name.trim(),
        description: form.description.trim(),
        history: form.history.trim() || null,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        star: form.star ? Number(form.star) : null,
        experiences: cleanedExperiences.length > 0 ? cleanedExperiences : null,
      };

      const { error } = await supabase
        .from("destinations")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      toast.success("Destination updated successfully!");
      setTimeout(() => navigate("/admin/dashboard/destinations/view"), 300);
    } catch (err) {
      toast.error(err.message || "Failed to update destination");
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ───────────────────────────────────────────────
  if (loading)
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
      </div>
    );

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">
          Destinations
        </p>
        <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">
          Edit Destination
        </h1>
        <p className="mt-1 text-sm text-[#695744]">
          Update the details for <strong>{id}</strong>.
        </p>
      </header>

      <div className="rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name + Capital */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Weather Label</label>
              <input
                name="weatherLabel"
                value={form.weatherLabel}
                onChange={handleChange}
                placeholder="Hot & Sunny"
                className={inputClass}
              />
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <label className={labelClass}>
              Hero Image URL <span className="text-red-400">*</span>
            </label>
            <input
              name="heroImage"
              value={form.heroImage}
              onChange={handleChange}
              className={inputClass}
            />
            {form.heroImage && (
              <img
                src={form.heroImage}
                alt="hero"
                className="mt-2 h-32 w-full rounded-2xl object-cover border border-stone-100"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          {/* Card Image */}
          <div>
            <label className={labelClass}>
              Card Image URL <span className="text-red-400">*</span>
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Hero Title */}
          <div>
            <label className={labelClass}>Hero Title</label>
            <input
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className={inputClass}
            />
          </div>

          {/* History */}
          <div>
            <label className={labelClass}>History</label>
            <input
              name="history"
              value={form.history}
              onChange={handleChange}
              placeholder="5000+ Years"
              className={inputClass}
            />
          </div>

          {/* Lat / Lng */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                type="number"
                step="any"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                type="number"
                step="any"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Star Rating</label>
              <input
                name="star"
                value={form.star}
                onChange={handleChange}
                type="number"
                min={1}
                max={5}
                step={0.1}
                className={inputClass}
              />
            </div>
          </div>

          {/* ── Experiences ─────────────────────────────── */}
          <div className="border-t border-[#f1e7d9] pt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + " mb-0"}>Experience Items</label>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1.5 rounded-full border border-[#d9c9b0] px-4 py-1.5 text-xs font-semibold text-[#695744] transition hover:bg-[#f9f3e9] cursor-pointer"
                >
                  <Plus size={13} /> Add Item
                </button>
              </div>

              {form.experiences.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-6 text-center text-sm text-stone-400">
                  No experience items yet. Click "Add Item" to start.
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
                              handleExpChange(i, "id", e.target.value)
                            }
                            placeholder="alex-qaitbay"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#695744] mb-1">
                            Title
                          </label>
                          <input
                            value={ex.title}
                            onChange={(e) =>
                              handleExpChange(i, "title", e.target.value)
                            }
                            placeholder="Citadel of Qaitbay"
                            className={inputClass}
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
                              handleExpChange(i, "image", e.target.value)
                            }
                            placeholder="https://example.com/exp.jpg"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#695744] mb-1">
                            Category
                          </label>
                          <input
                            value={ex.category}
                            onChange={(e) =>
                              handleExpChange(i, "category", e.target.value)
                            }
                            placeholder="Historical Sites"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      {/* Description + Delete */}
                      <div className="flex gap-3 items-end">
                        <span className="flex-1">
                          <label className="block text-bold font-medium text-[#695744] mb-1">
                            Remove Experience Item
                          </label>
                        </span>

                        <button
                          type="button"
                          onClick={() => removeExperience(i)}
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

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] disabled:opacity-60 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{" "}
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={3} /> Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard/destinations/view")}
              className="rounded-full border border-stone-300 px-8 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDestination;
