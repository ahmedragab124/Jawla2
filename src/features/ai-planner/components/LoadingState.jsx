function LoadingState() {
  return (
    <div className="mt-8">
      {[1, 2].map(day => (
        <div key={day} className="mb-8">
          <div className="skeleton-box h-7 w-20 rounded-full mb-4" />
          {[1, 2].map(card => (
            <div key={card} className="ai-trip-card ml-6 mb-4">
              <div className="skeleton-box w-32 h-28" style={{ borderRadius: 0 }} />
              <div className="flex-1 p-4 space-y-2">
                <div className="skeleton-box h-4 w-3/4" />
                <div className="skeleton-box h-3 w-full" />
                <div className="skeleton-box h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ))}
      <p className="text-center text-[#a57e55] text-sm mt-4">Building your itineraryâ¦</p>
    </div>
  )
}

export default LoadingState
