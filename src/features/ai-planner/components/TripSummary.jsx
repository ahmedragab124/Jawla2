import { Link } from 'react-router-dom'

function TripSummary({ destination, days, trip, selectedInterests, onPlanAnotherTrip }) {
  const attractionCount = Object.values(trip).reduce((total, stops) => total + stops.length, 0)

  return (
    <div className="ai-summary-card">
      <h3 className="ai-summary-title">Trip Summary</h3>
      <div className="ai-summary-grid">
        <div className="ai-summary-stat">
          <p className="ai-summary-stat-label">Destination</p>
          <p className="ai-summary-stat-value">{destination.name}</p>
        </div>
        <div className="ai-summary-stat">
          <p className="ai-summary-stat-label">Duration</p>
          <p className="ai-summary-stat-value">{days} {days === 1 ? 'Day' : 'Days'}</p>
        </div>
        <div className="ai-summary-stat">
          <p className="ai-summary-stat-label">Attractions</p>
          <p className="ai-summary-stat-value">{attractionCount}</p>
        </div>
      </div>

      {selectedInterests.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-white/60 mb-2">Interests</p>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map(interest => (
              <span key={interest} className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full">{interest}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-col sm:flex-row">
        <button onClick={onPlanAnotherTrip} className="ai-summary-btn ai-summary-btn-secondary">
          Plan Another Trip
        </button>
        <Link to={`/destination/${destination.id}`} className="ai-summary-btn ai-summary-btn-primary text-center">
          Explore {destination.name}
        </Link>
      </div>
    </div>
  )
}

export default TripSummary
