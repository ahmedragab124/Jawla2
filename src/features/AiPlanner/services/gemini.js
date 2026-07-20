import axios from 'axios'
import { buildPrompt } from './geminiPrompt'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'

export async function generateTrip({ destinationName, days, interests, attractions }) {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  const response = await axios.post(
    `${GEMINI_URL}?key=${API_KEY}`,
    {
      contents: [{ parts: [{ text: buildPrompt({ destinationName, days, interests, attractions }) }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1000,
        responseMimeType: 'application/json',
      },
    },
    { headers: { 'Content-Type': 'application/json' } },
  )

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty response from AI. Please try again.')

  return parseTrip(text, days)
}

export function parseTrip(text, days) {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
  const trip = JSON.parse(cleaned)
  const expectedDays = Array.from({ length: days }, (_, index) => `day${index + 1}`)

  if (!expectedDays.every(day => Array.isArray(trip[day]))) {
    throw new Error('AI returned an incomplete itinerary. Please try again.')
  }

  return Object.fromEntries(expectedDays.map(day => [day, trip[day]]))
}
