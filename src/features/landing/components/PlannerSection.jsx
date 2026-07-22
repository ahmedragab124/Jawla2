import { useEffect, useRef } from 'react';
import tourguideImage from '../../../assets/tourguide.png';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PlannerSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fesecte-section bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-24 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">Certified Local Guides</span>
        <h2 className="mt-2 text-4xl md:text-5xl font-black text-[#3f2b1a]">Book Your Guide</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-4 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto font-medium">
          Explore Egypt through the eyes of a local on Jawla
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div ref={imageRef} className="relative">
            <div className="overflow-hidden rounded-[36px] shadow-[0_30px_80px_rgba(76,48,24,0.18)] border-4 border-white">
              <img
                src={tourguideImage}
                alt="Local guide"
                className="h-[480px] w-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          <div ref={contentRef} className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-[#3f2b1a] md:text-5xl leading-tight">
              Explore through the eyes of a local
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d] lg:mx-0" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5b4423] lg:mx-0 md:text-lg">
              Unlock the secrets of Egypt with our certified professional guides. From the hidden chambers of the pyramids to the best street food in Khan el-Khalili, our experts ensure your journey is safe, authentic, and unforgettable.
            </p>

            <div className="mt-8 grid gap-4 text-left">
              <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-amber-900/10 shadow-xs">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#b57a2d] text-white font-bold text-sm">✓</span>
                <p className="text-sm font-bold text-[#3f2b1a]">History experts with academic & Egyptology backgrounds</p>
              </div>
              <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-amber-900/10 shadow-xs">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#b57a2d] text-white font-bold text-sm">✓</span>
                <p className="text-sm font-bold text-[#3f2b1a]">Fluent in over 12 global languages</p>
              </div>
              <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-amber-900/10 shadow-xs">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#b57a2d] text-white font-bold text-sm">✓</span>
                <p className="text-sm font-bold text-[#3f2b1a]">Private and small group personalized tours available</p>
              </div>
            </div>

            <Link to="/booking" className="mt-10 inline-flex rounded-2xl bg-[#b57a2d] px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-amber-900/20 transition-all duration-300 hover:bg-[#966321] hover:scale-105 active:scale-95">
              Book a Guide Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlannerSection;
