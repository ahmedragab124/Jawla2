import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'

function TripCard({ attraction, time }) {
  if (!attraction) return null

  const duration = attraction.duration >= 60
    ? `${Math.floor(attraction.duration / 60)}h ${attraction.duration % 60 > 0 ? attraction.duration % 60 + 'm' : ''}`.trim()
    : `${attraction.duration}m`

  return (
    <div className="ai-trip-card ml-6 mb-4">
      <img
        src={attraction.image || '/attractions/pyramids.png'}
        alt={attraction.name}
        className="ai-trip-card-img"
        onError={e => { e.target.src = '/attractions/pyramids.png' }}
      />
      <div className="ai-trip-card-body">
        <div>
          <p className="ai-time-label">{time}</p>
          <div className="flex items-start justify-between gap-2">
            <h3 className="ai-trip-card-name">{attraction.name}</h3>
            <span className="ai-category-tag bg-amber-100 text-amber-800 shrink-0">{attraction.category}</span>
          </div>
          <p className="ai-trip-card-desc">{attraction.description}</p>
        </div>
        <div className="ai-trip-card-meta">
          <span className="flex items-center gap-1"><Clock size={11} />{duration}</span>
          <span className="flex items-center gap-1"><MapPin size={11} />{attraction.bestTime}</span>
          <Link to="/attractions" className="ml-auto text-[#b57a2d] font-semibold text-xs hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TripCard
