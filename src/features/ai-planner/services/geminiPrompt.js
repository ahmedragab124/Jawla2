export function buildPrompt({ destinationName, days, interests, attractions }) {
  const attractionList = attractions.map((attraction, index) => (
    `${index + 1}. ID: "${attraction.id}" | Name: "${attraction.name}" | Category: ${attraction.category} | Duration: ${attraction.duration}min | BestTime: ${attraction.bestTime}`
  )).join('\n')

  return `Create a ${days}-day Egypt itinerary for ${destinationName}.
Traveler interests: ${interests.length ? interests.join(', ') : 'General sightseeing'}

Use ONLY these exact attraction IDs:
${attractionList}

Return a JSON object only. It must contain day1 through day${days}; each day is an array of 1 to 5 objects with exactly "time" and "attractionId". Do not repeat attraction IDs. Use Morning=09:00, Afternoon=13:00, Evening=18:00, Anytime=10:00.
Example: {"day1":[{"time":"09:00","attractionId":"exact-id"}],"day2":[{"time":"13:00","attractionId":"another-exact-id"}]}`
}
