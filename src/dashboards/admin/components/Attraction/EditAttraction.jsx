import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import { toast } from "react-toastify";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const cls = "w-full border rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d]";
const lbl = "block text-sm font-medium text-[#3f2b1a] mb-1";
const errCls = "mt-1 text-[10px] text-red-500 font-medium ml-2";

// 1. Define the Validation Schema
const attractionSchema = z.object({
  destinationId: z.string().min(1, "Please select a destination"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(20, "Description should be at least 20 characters"),
  image: z.string().url("Please enter a valid image URL"),
  duration: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional()),
  bestTime: z.string().default("Anytime"),
  star: z.preprocess((val) => Number(val), z.number().min(1).max(5)).default(5),
});

function EditAttraction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(attractionSchema),
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
      
      // 3. Reset form with fetched data
      reset({
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
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSaving(true);

    const { error } = await supabase
      .from("attractions")
      .update({
        destinationId: data.destinationId,
        name: data.name.trim(),
        category: data.category.trim(),
        description: data.description.trim(),
        image: data.image.trim(),
        duration: data.duration ? Number(data.duration) : null,
        bestTime: data.bestTime,
        star: Number(data.star),
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
      <h1 className="text-3xl font-bold text-[#3f2b1a] mb-4">Edit Attraction</h1>
      <p className="text-sm text-[#695744] mb-6">Update the details for this attraction.</p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
          <div>
            <label className={lbl}>Image URL</label>
            <input
              {...register("image")}
              placeholder="https://example.com/image.jpg"
              className={`${cls} ${errors.image ? 'border-red-500' : 'border-[#d9c9b0]'}`}
            />
            {errors.image && <p className={errCls}>{errors.image.message}</p>}
          </div>
        </div>

        <div>
          <label className={lbl}>Description</label>
          <textarea
            {...register("description")}
            rows="4"
            placeholder="Write a short description."
            className={`${cls} ${errors.description ? 'border-red-500' : 'border-[#d9c9b0]'}`}
          />
          {errors.description && <p className={errCls}>{errors.description.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={lbl}>Duration (min)</label>
            <input
              {...register("duration")}
              type="number"
              min="0"
              placeholder="90"
              className={cls}
            />
          </div>
          <div>
            <label className={lbl}>Best Time</label>
            <select {...register("bestTime")} className={cls}>
              {["Anytime", "Morning", "Afternoon", "Evening", "Night"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={lbl}>Star Rating</label>
            <input
              {...register("star")}
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
            {saving ? "Saving..." : <><Check size={16} strokeWidth={3} /> Save Changes</>}
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
