import { useState, useEffect } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { FaCompass, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BookingUnauthNotice from "./BookingUnauthNotice";
import BookingFormFields from "./BookingFormFields";
import { supabase } from "../../../supabase";

// 1. Define the Validation Schema with Zod
const bookingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  email: z.string().email("Invalid email address"),
  people: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Number of people is required" })
      .min(1, "At least 1 person is required")
  ),
  date: z.string().min(1, "Please select a date").refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Date must be today or in the future"),
  tourType: z.string().default("Historical Tour"),
  requests: z.string().optional(),
  guideId: z.string().min(1, "Please select a tour guide"),
});

function BookingForm() {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [guidesLoading, setGuidesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      tourType: "Historical Tour",
      guideId: "",
      requests: "",
      phone: "",
      people: "",
      date: "",
    },
  });

  useEffect(() => {
    const loadGuides = async () => {
      const { data, error } = await supabase
        .from("tourGuides")
        .select("*")
        .eq("status", "Approved");
      if (error) toast.error("Failed to fetch guides");
      else setGuides(data || []);
      setGuidesLoading(false);
    };

    loadGuides();
  }, []);

  // 3. Form Submission Handler
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");

    const bookingPayload = {
      ...data,
      guideId: data.guideId || null,
      people: Number(data.people),
      touristId: user.id,
      touristName: user.name,
      touristEmail: user.email,
      status: "Pending",
    };

    try {
      const { error } = await supabase.from("bookings").insert([bookingPayload]);
      if (error) throw error;
      
      setSuccessMessage("Your booking request has been submitted successfully!");
      toast.success("Booking request submitted successfully!");
      
      // Reset form to default values
      reset({
        fullName: user?.name || "",
        email: user?.email || "",
        tourType: "Historical Tour",
        guideId: "",
        requests: "",
        phone: "",
        people: "",
        date: "",
      });
    } catch (err) {
      toast.error(err?.message || "Booking error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <BookingUnauthNotice />;

  const guideOptions = [
    { value: "", label: "Select a tour guide" },
    ...guides.map((g) => ({ value: g.id, label: g.name })),
  ];

  return (
    <div className="relative w-full max-w-150 overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/30 bg-white/10 p-3 sm:p-5 lg:p-7 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-fadeUp">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md shadow-lg">
            <FaCompass className="text-xl text-[#B8860B]" />
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#8B5E3C] leading-tight">
          Find Your Perfect Guide
        </h2>
        <p className="mt-2 mb-4 text-center text-xs sm:text-sm text-[#5C4B3B]">
          Customize your trip with ease & local experts
        </p>

        <BookingFormFields
          register={register}
          errors={errors}
          today={today}
          guidesLoading={guidesLoading}
          guideOptions={guideOptions}
        />

        <button
          type="submit"
          disabled={loading || !!successMessage}
          className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            successMessage
              ? "bg-green-600"
              : "bg-gradient-to-r from-[#C79A2D] to-[#8B5E3C] hover:shadow-xl"
          }`}
        >
          {loading && <FaSpinner className="animate-spin" size={16} />}
          <span>
            {loading
              ? "Sending..."
              : successMessage
              ? "Submitted ✓"
              : "Submit Request →"}
          </span>
        </button>

        {successMessage && (
          <p className="mt-3 rounded-lg bg-green-100 py-2 text-center text-xs font-medium text-green-700">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
