import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { toast } from "react-toastify";

import StepIndicator from "./attractionSteps/StepIndicator";
import StepIdentity from "./attractionSteps/StepIdentity";
import StepMedia from "./attractionSteps/StepMedia";
import StepDescription from "./attractionSteps/StepDescription";
import StepDetails from "./attractionSteps/StepDetails";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = ["Identity", "Image", "Description", "Details"];

const EMPTY_FORM = {
  id: "",
  destinationId: "",
  name: "",
  category: "",
  description: "",
  duration: "",
  bestTime: "Anytime",
  star: 5,
  image: "",
};

function validate(step, form) {
  if (step === 1) {
    if (!form.destinationId) return "Please select a destination.";
    if (!form.name.trim()) return "Attraction name is required.";
    if (!form.category.trim()) return "Category is required.";
  }
  if (step === 2) {
    if (!form.image.trim()) return "Image URL is required.";
  }
  if (step === 3) {
    if (!form.description.trim()) return "Description is required.";
  }
  return null;
}

function Addattraction() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_FORM);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const err = validate(step, form);
    if (err) return toast.error(err);
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("attractions").insert([
        {
          id: form.id || undefined,
          destinationId: form.destinationId,
          name: form.name.trim(),
          category: form.category.trim(),
          description: form.description.trim(),
          image: form.image.trim(),
          duration: form.duration ? Number(form.duration) : null,
          bestTime: form.bestTime,
          star: Number(form.star),
        },
      ]);

      if (error) throw error;

      toast.success("Attraction added successfully!");
      setForm(EMPTY_FORM);
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
        Use the form below to add a new attraction to the platform. Please
        ensure all required fields are completed.
      </p>

      <StepIndicator currentStep={step} steps={STEPS} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <StepIdentity
            form={form}
            onChange={handleChange}
            destinations={destinations}
          />
        )}
        {step === 2 && <StepMedia form={form} onChange={handleChange} />}
        {step === 3 && <StepDescription form={form} onChange={handleChange} />}
        {step === 4 && <StepDetails form={form} onChange={handleChange} />}

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
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{" "}
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={3} /> Add Attraction
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Addattraction;
