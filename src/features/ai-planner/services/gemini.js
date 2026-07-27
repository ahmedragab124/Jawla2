import axios from "axios";
import { buildPrompt } from "./geminiPrompt";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-3.1-flash-lite";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const TIME_PATTERN = /^\d{2}:\d{2}$/;

const VISIT_TIMES = {
  Morning: "09:00",
  Afternoon: "13:00",
  Evening: "18:00",
  Anytime: "10:00",
};

// Utility function to introduce a delay (used for retry logic)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getVisitTime(time, attraction) {
  if (typeof time === "string" && TIME_PATTERN.test(time)) {
    return time;
  }
  // If time is not provided or invalid, use the attraction's best time or default to "Anytime"
  return VISIT_TIMES[attraction?.bestTime] ?? VISIT_TIMES.Anytime;
}

export async function generateTrip({
  destinationName,
  days,
  interests,
  attractions,
}) {
  if (!API_KEY || API_KEY === "your_gemini_api_key_here") {
    throw new Error(
      "Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.",
    );
  }

  try {
    // Request itinerary generation from Gemini API with retry logic
    const text = await requestGeminiWithRetry({
      destinationName,
      days,
      interests,
      attractions,
    });

    try {
      if (!text) {
        throw new Error("Empty Gemini response");
      }
      // Parse the Gemini response and return a structured trip itinerary
      return parseTrip(text, days, attractions);
    } catch {
      // return createFallbackTrip(days, attractions);
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    if (isTemporaryGeminiError(error)) {
      // return createFallbackTrip(days, attractions);
      throw new Error(
        "Gemini API is temporarily unavailable. Please try again later.",
      );
    }

    throw error;
  }
}

async function requestGeminiWithRetry({
  destinationName,
  days,
  interests,
  attractions,
}) {
  let lastError;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await axios.post(
        `${GEMINI_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: buildPrompt({
                    destinationName,
                    days,
                    interests,
                    attractions,
                  }),
                },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1000,
            responseMimeType: "application/json",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      lastError = error;

      if (!isTemporaryGeminiError(error) || attempt === 1) {
        throw error;
      }

      await delay(800);
    }
  }

  throw lastError;
}

function isTemporaryGeminiError(error) {
  const status = error.response?.status;

  return !status || [429, 500, 502, 503, 504].includes(status);
}

// handles parsing the Gemini response, ensuring only valid attractions are included and limiting to 5 stops per day
export function parseTrip(text, days, attractions = []) {
  const jsonText = extractJson(text);

  let parsedTrip;

  try {
    parsedTrip = JSON.parse(jsonText);
  } catch {
    throw new SyntaxError("Invalid JSON returned by Gemini");
  }

  // Map => id -> attraction
  const attractionMap = new Map(
    attractions.map((item) => [String(item.id), item]),
  );

  const usedIds = new Set();
  const normalizedTrip = {};

  for (let day = 1; day <= days; day++) {
    const stops = Array.isArray(parsedTrip[`day${day}`])
      ? parsedTrip[`day${day}`]
      : [];

    normalizedTrip[`day${day}`] = stops.reduce((dayStops, stop) => {
      const attractionId = String(stop?.attractionId ?? ""); // Ensure attractionId is a string for consistent Map lookup

      const attraction = attractionMap.get(attractionId); // Lookup attraction by ID

      // Skip invalid, duplicate, or excess stops
      if (!attraction || usedIds.has(attractionId) || dayStops.length >= 5) {
        return dayStops; // Skip invalid, duplicate, or excess stops
      }

      usedIds.add(attractionId); // Mark attraction as used to prevent duplicates

      // Determine the visit time, defaulting to the attraction's best time if not provided
      dayStops.push({
        attractionId: attraction.id,
        time: getVisitTime(stop.time, attraction),
      });

      return dayStops;
    }, []);
  }
  // Check if at least one day has valid stops
  const hasValidStops = Object.values(normalizedTrip).some(
    (stops) => stops.length > 0,
  );

  if (!hasValidStops) {
    throw new Error("Gemini response contained no valid attractions");
  }

  return normalizedTrip;
}

// Generates a fallback trip itinerary when Gemini fails or returns invalid data
// export function createFallbackTrip(days, attractions) {
//   const trip = Object.fromEntries(
//     Array.from({ length: days }, (_, index) => [`day${index + 1}`, []]),
//   );

//   const stopsPerDay = Math.min(
//     5,
//     Math.max(1, Math.ceil(attractions.length / days)),
//   );

//   const selectedAttractions = attractions.slice(0, days * stopsPerDay);

//   selectedAttractions.forEach((attraction, index) => {
//     const day = Math.floor(index / stopsPerDay) + 1;

//     trip[`day${day}`].push({
//       attractionId: attraction.id,
//       time: VISIT_TIMES[attraction.bestTime] ?? VISIT_TIMES.Anytime,
//     });
//   });

//   return trip;
// }

// Extracts the first JSON object from a string, ignoring any surrounding text or formatting
function extractJson(text) {
  const cleanedText = String(text)
    .replace(/```(?:json)?/gi, "")
    .trim();
  //handle cases where Gemini returns text before or after the JSON object, such as "Here's your itinerary: { ... } Enjoy your trip!"
  const startIndex = cleanedText.indexOf("{");
  const endIndex = cleanedText.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new SyntaxError("No JSON object found");
  }

  return cleanedText.slice(startIndex, endIndex + 1);
}

// example usage of the generateTrip function
// (async () => {
//   try {
//     const trip = await generateTrip({
//       destinationName: "Paris",
//       days: 3,
//       interests: ["art", "history"],
//       attractions: [
//         { id: 1, name: "Louvre Museum", bestTime: "Morning" },
//         { id: 2, name: "Eiffel Tower", bestTime: "Afternoon" },
//         { id: 3, name: "Notre Dame Cathedral", bestTime: "Morning" },
//         { id: 4, name: "Montmartre", bestTime: "Evening" },
//         { id: 5, name: "Seine River Cruise", bestTime: "Evening" },
//       ],
//     });

//     console.log("Generated Trip:", trip);
//   } catch (error) {
//     console.error("Error generating trip:", error);
//   }
// })();

//example usage of the parseTrip function
// const exampleText = `
// {
//   "day1": [
//     { "attractionId": 1, "time": "09:00" },
//     { "attractionId": 2, "time": "13:00" }
//   ],
//   "day2": [
//     { "attractionId": 3, "time": "10:00" },
//     { "attractionId": 4, "time": "18:00" }
//   ],

//   "day3": [
//     { "attractionId": 5, "time": "19:00" }
//   ]
// }
// `;

// const attractions = [
//   { id: 1, name: "Louvre Museum", bestTime: "Morning" },
//   { id: 2, name: "Eiffel Tower", bestTime: "Afternoon" },
//   { id: 3, name: "Notre Dame Cathedral", bestTime: "Morning" },
//   { id: 4, name: "Montmartre", bestTime: "Evening" },
//   { id: 5, name: "Seine River Cruise", bestTime: "Evening" },
// ];

// try {
//   const parsedTrip = parseTrip(exampleText, 3, attractions);
//   console.log("Parsed Trip:", parsedTrip);
// } catch (error) {
//   console.error("Error parsing trip:", error);
// }

//example usage of the extractJson function
// const exampleTextWithExtra = `
// Here's your itinerary:
// {
//   "day1": [
//     { "attractionId": 1, "time": "09:00" },
//     { "attractionId": 2, "time": "13:00" }
//   ],
//   "day2": [
//     { "attractionId": 3, "time": "10:00" },
//     { "attractionId": 4, "time": "18:00" }
//   ],
//   "day3": [
//     { "attractionId": 5, "time": "19:00" }
//   ]
// }
// Enjoy your trip!
// `;

// try {
//   const extractedJson = extractJson(exampleTextWithExtra);
//   console.log("Extracted JSON:", extractedJson);
// } catch (error) {
//   console.error("Error extracting JSON:", error);
// }
