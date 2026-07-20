const INTERESTS = ['History', 'Culture', 'Nature', 'Adventure', 'Photography', 'Relaxation', 'Shopping', 'Family']

function AIPlannerForm({
  destinations,
  destinationId,
  days,
  selectedInterests,
  error,
  loading,
  onDestinationChange,
  onDaysChange,
  onToggleInterest,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="ai-form-card">
      <div className="text-center mb-7">
        <h2 className="text-2xl font-extrabold text-[#3f2b1a]">Plan Your Trip</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#b57a2d]" />
      </div>

      <div className="mb-5">
        <label className="ai-form-label">Destination</label>
        <select
          id="ai-destination"
          value={destinationId}
          onChange={event => onDestinationChange(event.target.value)}
          className="ai-form-select"
        >
          <option value="">Select a destination</option>
          {destinations.map(destination => (
            <option key={destination.id} value={destination.id}>{destination.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="ai-form-label flex justify-between">
          Number of Days
          <span className="text-[#b57a2d] font-extrabold normal-case tracking-normal">
            {days} {days === 1 ? 'Day' : 'Days'}
          </span>
        </label>
        <input
          id="ai-days"
          type="range"
          min={1}
          max={7}
          value={days}
          onChange={event => onDaysChange(Number(event.target.value))}
          className="w-full h-2 rounded-full cursor-pointer accent-[#b57a2d]"
        />
        <div className="flex justify-between text-xs text-[#a57e55] mt-1">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <span key={day} className={day === days ? 'text-[#b57a2d] font-bold' : ''}>{day}</span>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <label className="ai-form-label mb-3">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => onToggleInterest(interest)}
              className={`ai-chip ${selectedInterests.includes(interest) ? 'selected' : ''}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button id="ai-generate-btn" type="submit" disabled={loading} className="ai-btn-generate">
        {loading ? 'Generating your tripâ€¦' : 'Generate My Trip'}
      </button>
    </form>
  )
}

export default AIPlannerForm
