import { useState } from "react";
import { groupAttractions } from "../utils/groupAttractions";
import { generateTrip } from "../services/gemini";

 function useAIPlanner() {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);

  async function createTrip({
    destinationId,
    destinationName,
    days,
    interests,
    attractions,
  }) {
    setLoading(true);
    setError(null);

    try {
      const filteredAttractions = groupAttractions(
        attractions,
        interests
      );

      const result = await generateTrip({
        destinationName,
        days,
        interests,
        attractions: filteredAttractions,
      });

      setTrip(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function resetTrip() {
    setTrip(null);
    setError(null);
  }

  return {
    loading,
    trip,
    error,
    createTrip,
    resetTrip,
  };
}

export default useAIPlanner;