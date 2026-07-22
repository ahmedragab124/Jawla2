import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';

// HeroSearchForm Component
function HeroSearchForm({ formRef }) {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');

  // Fetches destination dropdown list from Supabase
  useEffect(() => {
    const loadDestinations = async () => {
      const { data, error } = await supabase.from('destinations').select('id, name');
      if (error) console.error('Failed to load destinations:', error);
      else setDestinations(data || []);
    };

    loadDestinations();
  }, []);

  // Redirects instantly when user picks a destination option
  const handleSelectDestination = (e) => {
    const destId = e.target.value;
    setSelectedDestination(destId);
    if (destId) navigate(`/destination/${destId}`);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDestination) navigate(`/destination/${selectedDestination}`);
    else navigate('/destinations');
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="search-bar relative z-10">
      <h2 className="search-title">Search for Destinations</h2>

      <select
        value={selectedDestination}
        onChange={handleSelectDestination}
        className="search-input w-full cursor-pointer bg-slate-900/60 text-white font-semibold outline-none focus:border-amber-400"
      >
        <option value="" className="bg-slate-900 text-stone-300">
          Select a destination...
        </option>
        {destinations.map((d) => (
          <option key={d.id} value={d.id} className="bg-slate-900 text-white">
            {d.name}
          </option>
        ))}
      </select>

      <button type="submit" className="search-button cursor-pointer">
        Explore
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </form>
  );
}

export default HeroSearchForm;
