const STORAGE_KEY = 'jawla-ai-trips'

export function saveAITrip({ user, destination, days, interests, trip, attractions }) {
  if (!user) return

  const savedTrip = {
    id: `${Date.now()}-${destination.id}`,
    userId: user.id,
    createdAt: new Date().toISOString(),
    destination: { id: destination.id, name: destination.name, image: destination.image },
    days,
    interests,
    trip,
    attractions: attractions.map(({ id, name, image }) => ({ id, name, image })),
  }

  const trips = getAllTrips()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([savedTrip, ...trips].slice(0, 30)))
}

export function getAITrips(userId) {
  return getAllTrips().filter(trip => trip.userId === userId)
}

function getAllTrips() {
  try {
    const savedTrips = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(savedTrips) ? savedTrips : []
  } catch {
    return []
  }
}
