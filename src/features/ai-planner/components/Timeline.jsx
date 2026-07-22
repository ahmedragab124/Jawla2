import { useEffect, useRef } from 'react';
import TripCard from './TripCard';
import gsap from 'gsap';

function Timeline({ trip, findAttraction }) {
  const containerRef = useRef(null);
  const dayKeys = Object.keys(trip).filter((key) => key.startsWith('day')).sort();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const daySections = containerRef.current.querySelectorAll('.timeline-day-section');
      gsap.fromTo(
        daySections,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [trip]);

  return (
    <div ref={containerRef}>
      {dayKeys.map((dayKey, dayIndex) => (
        <div key={dayKey} className="timeline-day-section mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="ai-day-badge bg-[#b57a2d] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
              Day {dayIndex + 1}
            </span>
            <div className="ai-divider flex-grow h-0.5 bg-amber-900/10" />
            <span className="text-xs font-bold text-[#a57e55] bg-amber-50 px-3 py-1 rounded-full border border-amber-900/10">
              {trip[dayKey].length} stops
            </span>
          </div>
          <div className="ai-timeline border-l-2 border-amber-900/15 pl-6 ml-4 space-y-6">
            {trip[dayKey].map((item, index) => (
              <div key={index} className="relative">
                <div className="ai-timeline-dot absolute -left-[31px] top-6 h-4 w-4 rounded-full bg-[#b57a2d] border-4 border-white shadow-md" />
                <TripCard attraction={findAttraction(item.attractionId)} time={item.time} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
