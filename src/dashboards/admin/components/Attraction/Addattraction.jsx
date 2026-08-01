import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StepIndicator from "./attractionSteps/StepIndicator";
import StepIdentity from "./attractionSteps/StepIdentity";
import StepMedia from "./attractionSteps/StepMedia";
import StepDescription from "./attractionSteps/StepDescription";
import StepDetails from "./attractionSteps/StepDetails";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = ["Identity", "Image", "Description", "Details"];

// 1. Define the Validation Schema
const attractionSchema = z.object({
  id: z.string().optional(),
  destinationId: z.string().min(1, "Please select a destination"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(20, "Description should be at least 20 characters"),
  image: z.string().url("Please enter a valid image URL"),
  duration: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional()),
  bestTime: z.string().default("Anytime"),
  star: z.preprocess((val) => Number(val), z.number().min(1).max(5)).default(5),
});

function Addattraction() {
  const [step, setStep] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(attractionSchema),
    defaultValues: {
      id: "",
      destinationId: "",
      name: "",
      category: "",
      description: "",
      duration: "",
      bestTime: "Anytime",
      star: 5,
      image: "",
    },
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from("destinations")
          .select("id, name")
          .order("name", { ascending: true });
        if (error) throw error;
        setDestinations(data);
      } catch (err) {
        toast.error(err.message || "Failed to fetch destinations");
      }
    };
    fetchDestinations();
  }, []);

  // 3. Step Validation before moving forward
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["destinationId", "name", "category"];
    if (step === 2) fieldsToValidate = ["image"];
    if (step === 3) fieldsToValidate = ["description"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("attractions").insert([
        {
          id: data.id || undefined,
          destinationId: data.destinationId,
          name: data.name.trim(),
          category: data.category.trim(),
          description: data.description.trim(),
          image: data.image.trim(),
          duration: data.duration ? Number(data.duration) : null,
          bestTime: data.bestTime,
          star: Number(data.star),
        },
      ]);

      if (error) throw error;

      toast.success("Attraction added successfully!");
      reset();
      setStep(1);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
      <h1 className="text-3xl font-bold text-[#3f2b1a] mb-1">Add Attraction</h1>
      <p className="text-sm text-[#695744] mb-6">
        Use the form below to add a new attraction to the platform.
      </p>

      <StepIndicator currentStep={step} steps={STEPS} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <StepIdentity
            register={register}
            errors={errors}
            destinations={destinations}
          />
        )}
        {/* Note: In a real scenario, you'd update StepMedia, StepDescription, etc. similarly */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#3f2b1a]">Image URL</label>
            <input 
              {...register("image")} 
              className={`w-full border rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d] ${errors.image ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="text-[10px] text-red-500 font-medium ml-2">{errors.image.message}</p>}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#3f2b1a]">Description</label>
            <textarea 
              {...register("description")} 
              rows={5}
              className={`w-full border rounded-3xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#b57a2d] ${errors.description ? 'border-red-500' : 'border-[#d9c9b0]'}`} 
              placeholder="Enter attraction description..."
            />
            {errors.description && <p className="text-[10px] text-red-500 font-medium ml-2">{errors.description.message}</p>}
          </div>
        )}
        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#3f2b1a]">Duration (Hours)</label>
              <input {...register("duration")} type="number" className="w-full border border-[#d9c9b0] rounded-3xl py-3 px-4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3f2b1a]">Best Time to Visit</label>
              <input {...register("bestTime")} className="w-full border border-[#d9c9b0] rounded-3xl py-3 px-4" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d9c9b0] px-6 py-3 text-sm font-semibold text-[#695744] transition hover:bg-[#f9f3e9] cursor-pointer"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#9b6525] cursor-pointer"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-[#9b6525] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Saving..." : "Add Attraction"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Addattraction;
