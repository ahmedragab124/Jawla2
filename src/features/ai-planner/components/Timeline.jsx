import TripCard from './TripCard'

function Timeline({ trip, findAttraction }) {
  const dayKeys = Object.keys(trip).filter(key => key.startsWith('day')).sort()

  return dayKeys.map((dayKey, dayIndex) => (
    <div key={dayKey} className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="ai-day-badge">Day {dayIndex + 1}</span>
        <div className="ai-divider" />
        <span className="text-xs text-[#a57e55]">{trip[dayKey].length} stops</span>
      </div>
      <div className="ai-timeline">
        {trip[dayKey].map((item, index) => (
          <div key={index} className="relative mb-2">
            <div className="ai-timeline-dot" />
            <TripCard attraction={findAttraction(item.attractionId)} time={item.time} />
          </div>
        ))}
      </div>
    </div>
  ))
}

export default Timeline
