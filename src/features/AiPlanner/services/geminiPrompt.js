export function buildPrompt({
  destinationName,
  days,
  interests,
  attractions,
}) {
  return `
You are an expert travel planner.

Create a ${days}-day travel itinerary for ${destinationName}.

User Interests:
${interests.join(", ")}

Available Attractions:

${attractions
  .map(
    (place) => `
ID: ${place.id}
Name: ${place.name}
Category: ${place.category}
Duration: ${place.duration} minutes
`
  )
  .join("\n")}

Rules:
- Use ONLY the attractions listed above.
- Do NOT invent new attractions.
- Do NOT repeat attractions.
- Return ONLY valid JSON.
- Return attractionId instead of attraction names.

Example Response:

{
  "day1": [
    {
      "time": "09:00",
      "attractionId": 1
    },
    {
      "time": "13:00",
      "attractionId": 2
    }
  ],
  "day2": [
    {
      "time": "09:30",
      "attractionId": 3
    }
  ]
}
`;
}