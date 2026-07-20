import axios from 'axios'
import { buildPrompt } from './geminiPrompt'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`
const VISIT_TIMES = { Morning: '09:00', Afternoon: '13:00', Evening: '18:00', Anytime: '10:00' }

export async function generateTrip({ destinationName, days, interests, attractions }) {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  try {
    const text = await requestGeminiWithRetry({ destinationName, days, interests, attractions })

    try {
      if (!text) throw new Error('Empty Gemini response')
      return parseTrip(text, days, attractions)
    } catch {
      // Gemini can occasionally return malformed JSON despite responseMimeType.
      return createFallbackTrip(days, attractions)
    }
  } catch (error) {
    if (isTemporaryGeminiError(error)) {
      // Do not block the user when Gemini is busy, rate-limited, or temporarily unavailable.
      return createFallbackTrip(days, attractions)
    }
    throw error
  }
}

async function requestGeminiWithRetry({ destinationName, days, interests, attractions }) {
  let lastError

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await axios.post(
        `${GEMINI_URL}?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: buildPrompt({ destinationName, days, interests, attractions }) }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1000,
            responseMimeType: 'application/json',
          },
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text
    } catch (error) {
      lastError = error
      if (!isTemporaryGeminiError(error) || attempt === 1) throw error
      await new Promise(resolve => setTimeout(resolve, 800))
    }
  }

  throw lastError
}

function isTemporaryGeminiError(error) {
  const status = error.response?.status
  return !status || [429, 500, 502, 503, 504].includes(status)
}

export function parseTrip(text, days, attractions = []) {
  const jsonText = extractJson(text)
  const parsedTrip = JSON.parse(jsonText)
  const attractionIds = new Set(attractions.map(attraction => String(attraction.id)))
  const usedIds = new Set()
  const normalizedTrip = {}

  for (let day = 1; day <= days; day += 1) {
    const stops = Array.isArray(parsedTrip[`day${day}`]) ? parsedTrip[`day${day}`] : []
    normalizedTrip[`day${day}`] = stops.reduce((validStops, stop) => {
      const attractionId = String(stop?.attractionId ?? '')
      if (!attractionIds.has(attractionId) || usedIds.has(attractionId) || validStops.length === 5) return validStops

      usedIds.add(attractionId)
      const attraction = attractions.find(item => String(item.id) === attractionId)
      validStops.push({
        time: typeof stop.time === 'string' && /^\d{2}:\d{2}$/.test(stop.time)
          ? stop.time
          : VISIT_TIMES[attraction?.bestTime] || VISIT_TIMES.Anytime,
        attractionId: attraction?.id ?? attractionId,
      })
      return validStops
    }, [])
  }

  if (!Object.values(normalizedTrip).some(stops => stops.length > 0)) {
    throw new Error('Gemini response contained no valid attractions')
  }

  return normalizedTrip
}

export function createFallbackTrip(days, attractions) {
  const trip = Object.fromEntries(Array.from({ length: days }, (_, index) => [`day${index + 1}`, []]))
  const stopsPerDay = Math.min(5, Math.max(1, Math.ceil(attractions.length / days)))

  attractions.slice(0, days * stopsPerDay).forEach((attraction, index) => {
    const day = Math.floor(index / stopsPerDay) + 1
    trip[`day${day}`].push({
      time: VISIT_TIMES[attraction.bestTime] || VISIT_TIMES.Anytime,
      attractionId: attraction.id,
    })
  })

  return trip
}

function extractJson(text) {
  const withoutFence = String(text).replace(/```(?:json)?/gi, '').trim()
  const start = withoutFence.indexOf('{')
  const end = withoutFence.lastIndexOf('}')

  if (start === -1 || end === -1 || end < start) throw new SyntaxError('No JSON object found')
  return withoutFence.slice(start, end + 1)
}
