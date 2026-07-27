import { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, CalendarDays, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GuideSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const pillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        }
      );

      if (pillsRef.current) {
        const pills = pillsRef.current.children;
        gsap.fromTo(
          pills,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 88%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-28 overflow-hidden">
      {/* Section Header */}
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">AI Trip Planner</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#3f2b1a] tracking-tight">
          Plan Your Trip with AI
        </h2>
        <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-7 text-base md:text-lg leading-7 text-[#5b4423] max-w-2xl mx-auto font-medium">
          Let our AI build a personalized day-by-day itinerary tailored to your budget and interests
        </p>
      </div>

      {/* AI Planner Card */}
      <div
        ref={cardRef}
        className="mx-auto mt-16 max-w-5xl rounded-3xl bg-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(76,48,24,0.1)] border border-[#f4ebdd]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Text & CTA */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-[#3f2b1a] leading-tight">
              Create Your Custom Itinerary in Seconds
            </h3>

            <p className="max-w-xl text-sm sm:text-base leading-7 text-[#695540]">
              Tell our AI your destination, budget, and travel days to get an instant day-by-day plan with real attractions and local insights.
            </p>

            {/* Feature pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fdf8f0] border border-[#f4ebdd] px-4 py-2 text-xs font-bold text-[#3f2b1a] shadow-sm">
                <CalendarDays size={14} className="text-[#b57a2d]" /> Day-by-day plan
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fdf8f0] border border-[#f4ebdd] px-4 py-2 text-xs font-bold text-[#3f2b1a] shadow-sm">
                <MapPin size={14} className="text-[#b57a2d]" /> Real attractions
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fdf8f0] border border-[#f4ebdd] px-4 py-2 text-xs font-bold text-[#3f2b1a] shadow-sm">
                <Zap size={14} className="text-[#b57a2d]" /> Instant results
              </span>
            </div>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center pt-4">
              <Link
                to="/ai-planner"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9a581b] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-[#7b4217] hover:scale-105 active:scale-95 cursor-pointer"
              >
                Plan with AI <ArrowRight size={18} />
              </Link>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center rounded-2xl border border-[#9a581b] bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-[#9a581b] transition-all hover:bg-[#fffbf5] cursor-pointer"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Right Icon */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center rounded-full bg-[#fdf8f0] border-2 border-[#f4ebdd]">
              <div className="absolute inset-2 rounded-full bg-[#b57a2d]/5" />
              <Sparkles className="h-16 w-16 sm:h-20 sm:w-20 text-[#b57a2d]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSection;
