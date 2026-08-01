import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../../supabase";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StepIndicator from "./destinationSteps/StepIndicator";
import StepInfo from "./destinationSteps/StepInfo";
import StepImages from "./destinationSteps/StepImages";
import StepDetails from "./destinationSteps/StepDetails";
import StepLocation from "./destinationSteps/StepLocation";
import StepExperiences from "./destinationSteps/StepExperiences";

const STEPS = ["Info", "Images", "Details", "Location", "Experiences"];

// 1. Define the Validation Schema
const destinationSchema = z.object({
  id: z.string().min(1, "Destination ID is required"),
  name: z.string().min(1, "Name is required"),
  weatherLabel: z.string().optional().or(z.literal("")),
  heroImage: z.string().url("Invalid hero image URL"),
  image: z.string().url("Invalid card image URL"),
  heroTitle: z.string().optional().or(z.literal("")),
  description: z.string().min(20, "Description should be at least 20 characters"),
  history: z.string().optional().or(z.literal("")),
  latitude: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(-90).max(90, "Invalid latitude")),
  longitude: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(-180).max(180, "Invalid longitude")),
  star: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(1).max(5).optional()),
  experiences: z.array(z.object({
    id: z.string().min(1, "ID is required"),
    title: z.string().min(1, "Title is required"),
    image: z.string().url("Invalid image URL"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional().or(z.literal("")),
  })).optional(),
});

function AddDestination() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 2. Initialize React Hook Form
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      id: "",
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
      experiences: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // 3. Step Validation before moving forward
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["id", "name"];
    if (step === 2) fieldsToValidate = ["heroImage", "image"];
    if (step === 3) fieldsToValidate = ["description"];
    if (step === 4) fieldsToValidate = ["latitude", "longitude", "star"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("destinations").insert([
        {
          id: data.id.trim(),
          name: data.name.trim(),
          weatherLabel: data.weatherLabel?.trim() || null,
          heroImage: data.heroImage.trim(),
          image: data.image.trim(),
          heroTitle: data.heroTitle?.trim() || data.name.trim(),
          description: data.description.trim(),
          history: data.history?.trim() || null,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          star: data.star ? Number(data.star) : null,
          experiences: data.experiences && data.experiences.length > 0 ? data.experiences : null,
        },
      ]);

      if (error) throw error;

      toast.success("Destination added successfully!");
      reset();
      setStep(1);
    } catch (err) {
      toast.error(err.message || "Failed to add destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">Destinations</p>
        <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">Add Destination</h1>
        <p className="mt-1 text-sm text-[#695744]">Fill in the details step by step to add a new destination.</p>
      </header>

      <div className="rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
        <StepIndicator currentStep={step} steps={STEPS} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <StepInfo register={register} errors={errors} />}
          {step === 2 && <StepImages register={register} errors={errors} watch={watch} />}
          {step === 3 && <StepDetails register={register} errors={errors} />}
          {step === 4 && <StepLocation register={register} errors={errors} />}
          {step === 5 && (
            <StepExperiences
              register={register}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
            />
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 cursor-pointer"
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-full bg-[#b57a2d] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#9b6525] disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Saving..." : <><Check size={16} strokeWidth={3} /> Save Destination</>}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDestination;
