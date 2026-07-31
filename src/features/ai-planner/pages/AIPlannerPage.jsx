import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import AIPlannerHero from "../components/AIPlannerHero";
import AIPlannerForm from "../components/AIPlannerForm";
import LoadingState from "../components/LoadingState";
import Timeline from "../components/Timeline";
import TripSummary from "../components/TripSummary";
import { generateTrip } from "../services/gemini";
import { saveAITrip } from "../services/aiTripsStorage";
import { useAuth } from "../../auth/context/AuthContext";
import { supabase } from "../../../supabase";
import useSEO from "../../../hooks/useSEO";
import gsap from "gsap";
import "../styles/AIPlanner.css";

// AIPlannerPage Component
// Main page allowing users to select destination & interests to generate a day-by-day itinerary via Gemini AI.
function AIPlannerPage() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState("");
  const [days, setDays] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [destination, setDestination] = useState(null);

  const formCardRef = useRef(null);

  useSEO({
    title: "AI Itinerary Trip Planner",
    description:
      "Use Gemini AI to design a personalized daily travel itinerary for cities across Egypt. Pick interests, count days, and download your schedule.",
  });

  // Fetches available destinations list from Supabase
  useEffect(() => {
    async function loadDestinations() {
      try {
        const { data, error } = await supabase.from("destinations").select("*");
        if (error) throw error;
        setDestinations(data || []);
      } catch (err) {
        toast.error("Could not load destinations");
      }
    }

    loadDestinations();
  }, []);

  // Animates the form card entry using GSAP on mount
  useEffect(() => {
    if (formCardRef.current) {
      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.2)",
          delay: 0.1,
        },
      );
    }
  }, []);

  // Toggles interest selections

  const toggleInterest = (interest) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  // Triggers Gemini API itinerary generation & saves result locally
  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!destinationId) {
      toast.error("Please select a destination.");
      return;
    }

    setLoading(true);
    setTrip(null);

    try {
      const { data: destinationData, error: destinationError } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", destinationId)
        .single();

      if (destinationError) throw destinationError;

      const { data: attractions, error: attractionsError } = await supabase
        .from("attractions")
        .select("*")
        .eq("destinationId", destinationId);

      if (attractionsError) throw attractionsError;
      if (!attractions.length)
        throw new Error(`No attractions found for ${destinationData.name}.`);

      //using generateTrip from services/gemini.js to generate the trip itinerary

      const generatedTrip = await generateTrip({
        destinationName: destinationData.name,
        days,
        interests: selectedInterests,
        attractions,
      });

      setDestination({ ...destinationData, attractions });
      setTrip(generatedTrip);

      // Save the generated trip to local storage for the user
      saveAITrip({
        user,
        destination: destinationData,
        days,
        interests: selectedInterests,
        trip: generatedTrip,
        attractions,
      });
    } catch (requestError) {
      console.error(requestError);
      toast.error(
        requestError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Resolves attraction details by ID
  const findAttraction = (id) =>
    destination?.attractions?.find((a) => a.id === id) ?? null;

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <AIPlannerHero />

      <div className="ai-section">
        <div ref={formCardRef}>
          <AIPlannerForm
            destinations={destinations}
            destinationId={destinationId}
            days={days}
            selectedInterests={selectedInterests}
            loading={loading}
            onDestinationChange={(val) => {
              setDestinationId(val);
            }}
            onDaysChange={setDays}
            onToggleInterest={toggleInterest}
            onSubmit={handleGenerate}
          />
        </div>
        {loading && <LoadingState />}
        {!loading && !trip && (
          <div className="mt-8 rounded-3xl border border-[#f1e7d9] bg-white p-8 shadow-xs text-center space-y-6 max-w-2xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-[0.2em] text-[#b57a2d] uppercase">How It Works</span>
              <h3 className="text-2xl font-black text-[#3f2b1a]">3 Easy Steps to Your Custom Trip</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="rounded-2xl bg-[#fff9f0] border border-[#f3e6d3] p-4 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#3f2b1a] text-amber-400 font-bold text-sm shadow-xs">
                  1
                </div>
                <h4 className="text-sm font-bold text-[#3f2b1a]">Select City</h4>
                <p className="text-xs text-[#695744] font-medium leading-5">Choose any destination across Egypt.</p>
              </div>

              <div className="rounded-2xl bg-[#fff9f0] border border-[#f3e6d3] p-4 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#3f2b1a] text-amber-400 font-bold text-sm shadow-xs">
                  2
                </div>
                <h4 className="text-sm font-bold text-[#3f2b1a]">Days & Interests</h4>
                <p className="text-xs text-[#695744] font-medium leading-5">Set duration and your travel style.</p>
              </div>

              <div className="rounded-2xl bg-[#fff9f0] border border-[#f3e6d3] p-4 text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#b57a2d] text-white font-bold text-sm shadow-md">
                  3
                </div>
                <h4 className="text-sm font-bold text-[#3f2b1a]">Get Schedule</h4>
                <p className="text-xs text-[#695744] font-medium leading-5">AI generates your daily itinerary.</p>
              </div>
            </div>
          </div>
        )}
        {!loading && trip && destination && (
          <div className="mt-10">
            <div className="text-center mb-10 space-y-3">
              <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">Your Customized Schedule</span>
              <h2 className="text-3xl font-black text-[#3f2b1a]">
                {days}-Day Itinerary — {destination.name}
              </h2>
              <div className="mx-auto h-1 w-16 rounded-full bg-[#b57a2d]" />
              
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#b57a2d] bg-white px-6 py-2.5 text-xs font-bold text-[#b57a2d] shadow-sm transition hover:bg-[#b57a2d] hover:text-white cursor-pointer no-print"
                >
                  🖨️ Print / Download PDF
                </button>
              </div>
            </div>
            <Timeline trip={trip} findAttraction={findAttraction} />
            <TripSummary
              destination={destination}
              days={days}
              trip={trip}
              selectedInterests={selectedInterests}
              onPlanAnotherTrip={() => {
                setTrip(null);
                setDestination(null);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default AIPlannerPage;
