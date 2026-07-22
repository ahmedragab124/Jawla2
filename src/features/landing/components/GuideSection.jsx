import { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GuideSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20 overflow-hidden">
      {/* Section Header */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">AI Trip Planner</span>
        <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Plan Your Trip with AI</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
      </div>

      {/* Clean Minimalist AI Planner Card */}
      <div
        ref={cardRef}
        className="mx-auto mt-10 max-w-4xl rounded-4xl bg-white p-8 shadow-[0_20px_70px_rgba(76,48,24,0.1)] border border-[#f4ebdd] sm:p-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left Text & CTA */}
          <div className="lg:col-span-8 space-y-5 text-left">
        
            <h3 className="text-3xl font-extrabold text-[#3f2b1a] sm:text-4xl leading-tight">
              Create Your Custom Itinerary in Seconds
            </h3>

            <p className="max-w-xl text-base leading-7 text-[#695540]">
              Tell our AI your destination, budget, and travel days to get an instant day-by-day plan with real attractions.
            </p>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center pt-2">
              <Link
                to="/ai-planner"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9a581b] px-6 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-[#7b4217] hover:scale-105 active:scale-95 cursor-pointer"
              >
                Plan with AI <ArrowRight size={18} />
              </Link>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center rounded-2xl border border-[#9a581b] bg-white px-6 py-3.5 text-base font-bold text-[#9a581b] transition-all hover:bg-[#fffbf5] cursor-pointer"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Right Clean Icon Circle */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#fdf8f0] border-4 border-[#f5ebdd] shadow-inner">
              <Sparkles className="h-20 w-20 text-[#b57a2d]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSection;
