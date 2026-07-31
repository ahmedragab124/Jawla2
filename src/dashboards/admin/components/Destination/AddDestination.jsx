import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../../supabase";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

import StepIndicator from "./destinationSteps/StepIndicator";
import StepInfo from "./destinationSteps/StepInfo";
import StepImages from "./destinationSteps/StepImages";
import StepDetails from "./destinationSteps/StepDetails";
import StepLocation from "./destinationSteps/StepLocation";
import StepExperiences from "./destinationSteps/StepExperiences";

// ── Config ────────────────────────────────────────────────────
const STEPS = ["Info", "Images", "Details", "Location", "Experiences"];

const EMPTY_FORM = {
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
  experiences: [], // [{ id, image, title, category, description }]
};

// ── Validation per step ───────────────────────────────────────
function validate(step, form) {
  if (step === 1) {
    if (!form.id.trim()) return "Destination ID is required.";
    if (!form.name.trim()) return "Name is required.";
  }
  if (step === 2) {
    if (!form.heroImage.trim()) return "Hero Image URL is required.";
    if (!form.image.trim()) return "Card Image URL is required.";
  }
  if (step === 3) {
    if (!form.description.trim()) return "Description is required.";
  }
  if (step === 4) {
    if (!form.latitude || !form.longitude)
      return "Latitude and Longitude are required for the weather widget.";
    else if (!form.star || form.star < 1 || form.star > 5) {
      return "Star rating must be between 1 and 5.";
    }
  }
  return null;
}

// ── Main Component ────────────────────────────────────────────
function AddDestination() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  // Generic field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Experience list handlers
  const handleAddExperience = () =>
    setForm((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: "", image: "", title: "", category: "" },
      ],
    }));

  const handleRemoveExperience = (i) =>
    setForm((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, idx) => idx !== i),
    }));

  const handleExperienceChange = (i, field, value) =>
    setForm((prev) => {
      const updated = [...prev.experiences];
      updated[i] = { ...updated[i], [field]: value };
      return { ...prev, experiences: updated };
    });

  // Navigation
  const handleNext = () => {
    const err = validate(step, form);
    if (err) return toast.error(err);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedExperiences = form.experiences.filter(
      (ex) => ex.id?.trim() && ex.image?.trim(),
    );

    setLoading(true);

    try {
      const { error } = await supabase.from("destinations").insert([
        {
          id: form.id.trim(),
          name: form.name.trim(),
          weatherLabel: form.weatherLabel.trim() || null,
          heroImage: form.heroImage.trim(),
          image: form.image.trim(),
          heroTitle: form.heroTitle.trim() || form.name.trim(),
          description: form.description.trim(),
          history: form.history.trim() || null,
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          star: Number(form.star),
          experiences:
            cleanedExperiences.length > 0 ? cleanedExperiences : null,
        },
      ]);

      if (error) throw error;

      toast.success("Destination added successfully!");
      setForm(EMPTY_FORM);
      setStep(1);
    } catch (err) {
      toast.error(err.message || "Failed to add destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">
          Destinations
        </p>
        <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">
          Add Destination
        </h1>
        <p className="mt-1 text-sm text-[#695744]">
          Fill in the details step by step to add a new destination.
        </p>
      </header>

      {/* Card */}
      <div className="rounded-4xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#f1e7d9]">
        <StepIndicator currentStep={step} steps={STEPS} />

        <form onSubmit={handleSubmit}>
          {/* ── Step Content ── */}
          {step === 1 && <StepInfo form={form} onChange={handleChange} />}
          {step === 2 && <StepImages form={form} onChange={handleChange} />}
          {step === 3 && <StepDetails form={form} onChange={handleChange} />}
          {step === 4 && <StepLocation form={form} onChange={handleChange} />}
          {step === 5 && (
            <StepExperiences
              form={form}
              onChange={handleChange}
              onAddExperience={handleAddExperience}
              onRemoveExperience={handleRemoveExperience}
              onExperienceChange={handleExperienceChange}
            />
          )}

          {/* ── Navigation ── */}
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
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{" "}
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} strokeWidth={3} /> Save Destination
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDestination;
