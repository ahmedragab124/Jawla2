import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import { toast } from "react-toastify";
import { Check } from "lucide-react";

const cls =
  "w-full border border-[#d9c9b0] rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";

function EditAttraction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    destinationId: "",
    name: "",
    category: "",
    description: "",
    duration: "",
    bestTime: "Anytime",
    star: 5,
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: attraction, error: aErr }, { data: dests, error: dErr }] =
        await Promise.all([
          supabase.from("attractions").select("*").eq("id", id).single(),
          supabase
            .from("destinations")
            .select("id, name")
            .order("name", { ascending: true }),
        ]);

      if (aErr || dErr) {
        toast.error("Failed to load data.");
        setLoading(false);
        return;
      }

      setDestinations(dests || []);
      setForm({
        destinationId: attraction.destinationId || "",
        name: attraction.name || "",
        category: attraction.category || "",
        description: attraction.description || "",
        duration: attraction.duration || "",
        bestTime: attraction.bestTime || "Anytime",
        star: attraction.star || 5,
        image: attraction.image || "",
      });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.destinationId ||
      !form.name.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.image.trim()
    )
      return toast.error("Please fill in all required fields.");

    setSaving(true);

    const { error } = await supabase
      .from("attractions")
      .update({
        destinationId: form.destinationId,
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        duration: form.duration ? Number(form.duration) : null,
        bestTime: form.bestTime,
        star: Number(form.star),
      })
      .eq("id", id);

    setSaving(false);

    if (error) return toast.error(error.message);

    toast.success("Attraction updated successfully!");
    setTimeout(() => navigate("/admin/dashboard/attractions/view"), 300);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 min-h-[40vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
      </div>
    );

  return (
    <div className="max-w-3xl rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
      <h1 className="text-3xl font-bold text-[#3f2b1a] mb-4">
        Edit Attraction
      </h1>
      <p className="text-sm text-[#695744] mb-6">
        Update the details for this attraction.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Attraction Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Example: Giza Pyramids"
              className={cls}
            />
          </div>
          <div>
            <label className={lbl}>Destination</label>
            <select
              name="destinationId"
              value={form.destinationId}
              onChange={handleChange}
              className={cls}
            >
              <option value="">Select a destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              type="text"
              placeholder="Historical / Museum / Outdoor"
              className={cls}
            />
          </div>
          <div>
            <label className={lbl}>Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={cls}
            />
          </div>
        </div>

        <div>
          <label className={lbl}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write a short description."
            className={cls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={lbl}>Duration (min)</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
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
              onChange={handleChange}
              className={cls}
            >
              {["Anytime", "Morning", "Afternoon", "Evening", "Night"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className={lbl}>Star Rating</label>
            <input
              name="star"
              value={form.star}
              onChange={handleChange}
              type="number"
              min="1"
              max="5"
              step="0.1"
              className={cls}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 justify-center rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] disabled:opacity-60 cursor-pointer"
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
            onClick={() => navigate("/admin/dashboard/attractions/view")}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 px-8 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAttraction;
