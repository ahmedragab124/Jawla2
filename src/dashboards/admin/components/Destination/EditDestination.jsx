import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { supabase } from "../../../../supabase";
import { FormSkeleton } from "../../../../shared/components/ui/Skeleton";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const inputClass = "w-full border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b57a2d] bg-white/70 transition";
const labelClass = "block text-sm font-semibold text-[#3f2b1a] mb-1.5";
const errCls = "mt-1 text-[10px] text-red-500 font-medium ml-2";

// 1. Define the Validation Schema
const destinationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  weatherLabel: z.string().optional().or(z.literal("")),
  heroImage: z.string().url("Invalid hero image URL"),
  image: z.string().url("Invalid card image URL"),
  heroTitle: z.string().optional().or(z.literal("")),
  description: z.string().min(20, "Description should be at least 20 characters"),
  history: z.string().optional().or(z.literal("")),
  latitude: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional()),
  longitude: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional()),
  star: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(1).max(5).optional()),
  experiences: z.array(z.object({
    id: z.string().min(1, "ID is required"),
    title: z.string().min(1, "Title is required"),
    image: z.string().url("Invalid image URL"),
    category: z.string().min(1, "Category is required"),
  })).optional(),
});

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(destinationSchema),
  });

  // 3. Use field array for dynamic experiences
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

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

      reset({
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
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSaving(true);

    try {
      const updateData = {
        name: data.name.trim(),
        weatherLabel: data.weatherLabel?.trim() || null,
        heroImage: data.heroImage.trim(),
        image: data.image.trim(),
        heroTitle: data.heroTitle?.trim() || data.name.trim(),
        description: data.description.trim(),
        history: data.history?.trim() || null,
        latitude: data.latitude ? Number(data.latitude) : null,
        longitude: data.longitude ? Number(data.longitude) : null,
        star: data.star ? Number(data.star) : null,
        experiences: data.experiences && data.experiences.length > 0 ? data.experiences : null,
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

  if (loading)
    return (
      <div className="max-w-2xl">
        <FormSkeleton />
      </div>
    );

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">Destinations</p>
        <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">Edit Destination</h1>
        <p className="mt-1 text-sm text-[#695744]">Update the details for <strong>{id}</strong>.</p>
      </header>

      <div className="rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Name <span className="text-red-400">*</span></label>
              <input {...register("name")} className={`${inputClass} ${errors.name ? 'border-red-500' : 'border-[#d9c9b0]'}`} />
              {errors.name && <p className={errCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Weather Label</label>
              <input {...register("weatherLabel")} placeholder="Hot & Sunny" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Hero Image URL <span className="text-red-400">*</span></label>
            <input {...register("heroImage")} className={`${inputClass} ${errors.heroImage ? 'border-red-500' : 'border-[#d9c9b0]'}`} />
            {errors.heroImage && <p className={errCls}>{errors.heroImage.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Card Image URL <span className="text-red-400">*</span></label>
            <input {...register("image")} className={`${inputClass} ${errors.image ? 'border-red-500' : 'border-[#d9c9b0]'}`} />
            {errors.image && <p className={errCls}>{errors.image.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Hero Title</label>
            <input {...register("heroTitle")} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Description <span className="text-red-400">*</span></label>
            <textarea {...register("description")} rows="4" className={`${inputClass} ${errors.description ? 'border-red-500' : 'border-[#d9c9b0]'}`} />
            {errors.description && <p className={errCls}>{errors.description.message}</p>}
          </div>

          <div>
            <label className={labelClass}>History</label>
            <input {...register("history")} placeholder="5000+ Years" className={inputClass} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input {...register("latitude")} type="number" step="any" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input {...register("longitude")} type="number" step="any" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Star Rating</label>
              <input {...register("star")} type="number" min={1} max={5} step={0.1} className={inputClass} />
            </div>
          </div>

          <div className="border-t border-[#f1e7d9] pt-5 space-y-4">
            <div className="flex items-center justify-between mb-3">
              <label className={labelClass + " mb-0"}>Experience Items</label>
              <button
                type="button"
                onClick={() => append({ id: "", image: "", title: "", category: "" })}
                className="flex items-center gap-1.5 rounded-full border border-[#d9c9b0] px-4 py-1.5 text-xs font-semibold text-[#695744] transition hover:bg-[#f9f3e9] cursor-pointer"
              >
                <Plus size={13} /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, i) => (
                <div key={field.id} className="rounded-2xl border border-[#f1e7d9] bg-[#fdfaf6] p-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#695744] mb-1">ID / Slug</label>
                      <input {...register(`experiences.${i}.id`)} placeholder="alex-qaitbay" className={inputClass} />
                      {errors.experiences?.[i]?.id && <p className={errCls}>{errors.experiences[i].id.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#695744] mb-1">Title</label>
                      <input {...register(`experiences.${i}.title`)} placeholder="Citadel of Qaitbay" className={inputClass} />
                      {errors.experiences?.[i]?.title && <p className={errCls}>{errors.experiences[i].title.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#695744] mb-1">Image URL</label>
                      <input {...register(`experiences.${i}.image`)} placeholder="https://example.com/exp.jpg" className={inputClass} />
                      {errors.experiences?.[i]?.image && <p className={errCls}>{errors.experiences[i].image.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#695744] mb-1">Category</label>
                      <input {...register(`experiences.${i}.category`)} placeholder="Historical Sites" className={inputClass} />
                      {errors.experiences?.[i]?.category && <p className={errCls}>{errors.experiences[i].category.message}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving..." : <><Check size={16} strokeWidth={3} /> Save Changes</>}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard/destinations/view")}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-8 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 cursor-pointer"
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
