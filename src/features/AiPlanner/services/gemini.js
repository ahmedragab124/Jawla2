import axios from "axios";
import { buildPrompt } from "./promptBuilder";

 async function generateTrip({
  destinationName,
  days,
  interests,
  attractions,
}) {
  const prompt = buildPrompt({
    destinationName,
    days,
    interests,
    attractions,
  });

  try {
    const response = await axios.post(
      `${"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return parseTrip(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate trip.");
  }
}



function parseTrip(text) {
  const cleaned = text
    .replace(/^```json/i, "")
    .replace(/```/g, "")
    .trim();

  const trip = JSON.parse(cleaned);

  if (!trip.day1) {
    throw new Error("Invalid trip data.");
  }

  return trip;
}

export { generateTrip, parseTrip };