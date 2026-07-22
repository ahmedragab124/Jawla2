import { useEffect, useState, useRef } from 'react';
import AIPlannerHero from '../components/AIPlannerHero';
import AIPlannerForm from '../components/AIPlannerForm';
import LoadingState from '../components/LoadingState';
import Timeline from '../components/Timeline';
import TripSummary from '../components/TripSummary';
import { generateTrip } from '../services/gemini';
import { saveAITrip } from '../services/aiTripsStorage';
import { useAuth } from '../../auth/context/AuthContext';
import { supabase } from '../../../supabase';
import useSEO from '../../../hooks/useSEO';
import gsap from 'gsap';
import '../styles/AIPlanner.css';

// AIPlannerPage Component
// Main page allowing users to select destination & interests to generate a day-by-day itinerary via Gemini AI.
function AIPlannerPage() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState('');
  const [days, setDays] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trip, setTrip] = useState(null);
  const [destination, setDestination] = useState(null);
  
  const formCardRef = useRef(null);

  useSEO({
    title: 'AI Itinerary Trip Planner',
    description: 'Use Gemini AI to design a personalized daily travel itinerary for cities across Egypt. Pick interests, count days, and download your schedule.'
  });

  // Fetches available destinations list from Supabase
  useEffect(() => {
    async function loadDestinations() {
      try {
        const { data, error } = await supabase.from('destinations').select('*');
        if (error) throw error;
        setDestinations(data || []);
      } catch (err) {
        console.error(err);
        setError('Could not load destinations.');
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
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.2)', delay: 0.1 }
      );
    }
  }, []);

  // Toggles interest selections
  const toggleInterest = (interest) => {
    setSelectedInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]
    );
  };

  // Triggers Gemini API itinerary generation & saves result locally
  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!destinationId) return setError('Please select a destination.');

    setLoading(true);
    setError('');
    setTrip(null);

    try {
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', destinationId)
        .single();

      if (destinationError) throw destinationError;

      const { data: attractions, error: attractionsError } = await supabase
        .from('attractions')
        .select('*')
        .eq('destinationId', destinationId);

      if (attractionsError) throw attractionsError;
      if (!attractions.length) throw new Error(`No attractions found for ${destinationData.name}.`);

      const generatedTrip = await generateTrip({
        destinationName: destinationData.name,
        days,
        interests: selectedInterests,
        attractions,
      });

      setDestination({ ...destinationData, attractions });
      setTrip(generatedTrip);

      saveAITrip({ user, destination: destinationData, days, interests: selectedInterests, trip: generatedTrip, attractions });
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resolves attraction details by ID
  const findAttraction = (id) => destination?.attractions?.find((a) => a.id === id) ?? null;

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
            error={error}
            loading={loading}
            onDestinationChange={(val) => { setDestinationId(val); setError(''); }}
            onDaysChange={setDays}
            onToggleInterest={toggleInterest}
            onSubmit={handleGenerate}
          />
        </div>
        {loading && <LoadingState />}
        {!loading && !error && !trip && (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-[#3f2b1a] mb-2">Your journey starts here</h2>
            <p className="text-[#5b4423] text-sm max-w-sm mx-auto">Choose a destination, pick your interests, and let AI build your itinerary.</p>
          </div>
        )}
        {!loading && !error && trip && destination && (
          <div className="mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-[#3f2b1a]">{days}-Day Itinerary — {destination.name}</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#b57a2d]" />
              <button onClick={() => window.print()} className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-[#b57a2d] text-[#b57a2d] font-semibold text-sm hover:bg-[#b57a2d] hover:text-white transition no-print cursor-pointer">Print / Save as PDF</button>
            </div>
            <Timeline trip={trip} findAttraction={findAttraction} />
            <TripSummary destination={destination} days={days} trip={trip} selectedInterests={selectedInterests} onPlanAnotherTrip={() => { setTrip(null); setDestination(null); }} />
          </div>
        )}
      </div>
    </main>
  );
}

export default AIPlannerPage;
