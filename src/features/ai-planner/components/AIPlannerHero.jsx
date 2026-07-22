import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// AIPlannerHero Component
// Hero section header for the AI Planner page featuring staggered 3D word reveal animation.
function AIPlannerHero() {
  const wordsRef = useRef([]);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  const titleWords = [
    { text: 'Your', isGradient: false },
    { text: 'Personal', isGradient: false },
    { text: 'Egypt', isGradient: true },
    { text: 'Itinerary', isGradient: true },
  ];

  // Initializes GSAP staggered word entrance animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      tl.fromTo(
        wordsRef.current,
        { opacity: 0, y: 50, rotateX: -45, scale: 0.85 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.12, delay: 0.15 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="ai-hero">
      <nav className="flex items-center justify-center gap-1 text-sm mb-5 text-white/60">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <span className="text-white/90">AI Planner</span>
      </nav>

      {/* 3D staggered title words */}
      <h1 className="ai-hero-title flex flex-wrap justify-center gap-x-3 gap-y-1 perspective-800">
        {titleWords.map((item, idx) => (
          <span
            key={idx}
            ref={(el) => (wordsRef.current[idx] = el)}
            className={`inline-block origin-bottom ${
              item.isGradient
                ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-md'
                : 'text-white'
            }`}
          >
            {item.text}
          </span>
        ))}
      </h1>

      <p ref={subtitleRef} className="ai-hero-subtitle">
        Choose your destination and interests — AI builds your daily schedule.
      </p>
    </section>
  );
}

export default AIPlannerHero;
