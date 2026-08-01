import { useEffect, useRef } from "react";
import {
  Compass,
  Sparkles,
  MapPin,
  Repeat,
  ShieldCheck,
  Footprints,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSEO from "../../../hooks/useSEO";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: Footprints,
    title: "Unexplored Hidden Gems",
    text: "We take you beyond standard tourist traps to discover secret alleys in Cairo, quiet coastlines, and hidden spots across all governorates.",
  },
  {
    icon: Repeat,
    title: "A Destination to Return To",
    text: "Our mission is to change one-time visits into lifelong journeys, making sure every trip reveals a totally new side of Egypt.",
  },
  {
    icon: Sparkles,
    title: "Beyond Traditional Heritage",
    text: "From authentic local eateries and modern cultural hubs to historic streets and natural escapes — Egypt is vibrant and ever-changing.",
  },
  {
    icon: HeartHandshake,
    title: "Authentic Local Connection",
    text: "Connect with certified local Egyptologist guides who share the real stories, hidden cafes, and genuine warmth of Egyptian hospitality.",
  },
];

const STATS = [
  { number: "27+", label: "Governorates Covered" },
  { number: "150+", label: "Hidden Gems & Spots" },
  { number: "100%", label: "Authentic Experiences" },
];

function AboutPage() {
  useSEO({
    title: "About Jawla — Rediscover Egypt's Hidden Gems",
    description:
      "Learn about Jawla — redefining Egyptian tourism by connecting travelers to hidden gems, local governorates, and unforgettable experiences beyond the famous pyramids.",
  });

  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const pillarsRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Story section reveal
      gsap.fromTo(
        storyRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: storyRef.current, start: "top 85%" },
        },
      );

      // Pillars card stagger
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 85%" },
          },
        );
      }

      // Stats reveal
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          },
        );
      }

      // CTA section
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-b from-[#fffaf0] via-[#f7ebd9] to-[#fffaf0]">
      {/* ── 1. Hero Banner ─────────────────────────────────── */}
      <section ref={heroRef} className="px-5 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-[#3f2b1a] via-[#2c1d12] to-[#1a110a] px-8 py-16 text-white md:px-16 md:py-24 shadow-2xl border border-[#b57a2d]/30">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#b57a2d]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#b57a2d]/20 border border-[#b57a2d]/40 px-4 py-1.5 text-xs font-black tracking-[0.25em] text-[#e4c58d] uppercase backdrop-blur-md">
                <Compass size={14} className="text-[#b57a2d]" /> About Jawla
              </span>

              <h1 className="text-4xl font-black leading-tight md:text-6xl tracking-tight text-white">
                Egypt is Far More Than a{" "}
                <span className="text-amber-400">One-Time Visit</span>.
              </h1>

              <p className="text-base leading-8 text-[#f7e7d7] md:text-xl font-medium">
                Most travelers visit Egypt once to see the famous pyramids,
                thinking they've seen it all. We built <strong>Jawla</strong> to
                show you the hidden magic — undiscovered gems, local
                neighborhood spots, and governorates that will make you return
                again and again.
              </p>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 rounded-full bg-[#b57a2d] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#b57a2d]/30 transition-all duration-300 hover:bg-[#9b6525] hover:scale-105 active:scale-95"
                >
                  <span>Explore Hidden Destinations</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/attractions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                >
                  Discover Landmarks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Core Philosophy / Story ─────────────────── */}
      <section ref={storyRef} className="py-16 px-5">
        <div className="mx-auto max-w-5xl rounded-[36px] bg-white p-8 md:p-14 shadow-[0_20px_60px_rgba(63,43,26,0.06)] border border-[#f1e7d9] text-center space-y-6">
          <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">
            Why We Founded Jawla
          </span>

          <h2 className="text-3xl font-black text-[#3f2b1a] md:text-5xl leading-tight max-w-3xl mx-auto">
            Rediscover the Real Egypt Through Local Eyes
          </h2>

          <p className="mx-auto max-w-3xl leading-8 text-[#695744] text-base md:text-lg font-medium">
            When tourists visit Egypt, they often stick to well-known landmarks.
            Once those are checked off, many feel there is nothing left to
            explore.
          </p>

          <div className="rounded-2xl bg-[#fff9f0] border border-[#f3e6d3] p-6 text-left max-w-3xl mx-auto font-medium text-[#4a3a2a] text-sm md:text-base leading-7">
            💡 <strong>Our Belief:</strong> Egypt is an endless tapestry of
            stories. From small tucked-away cafes in historic Cairo to
            breathtaking coastal villages and undiscovered heritage sites in
            every governorate — there is always a new adventure waiting for you.
          </div>
        </div>
      </section>

      {/* ── 3. The 4 Pillars ───────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">
              What Makes Us Different
            </span>
            <h2 className="mt-2 text-3xl font-black text-[#3f2b1a] md:text-4xl">
              The Four Pillars of Jawla
            </h2>
          </div>

          <div ref={pillarsRef} className="grid gap-6 md:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl bg-white p-8 border border-[#f1e7d9] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 space-y-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7ebd9] text-[#3f2b1a] group-hover:bg-[#b57a2d] group-hover:text-white transition-colors duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-[#3f2b1a] group-hover:text-[#b57a2d] transition-colors">
                  {title}
                </h3>
                <p className="leading-7 text-[#695744] text-sm md:text-base font-medium">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Stats Counter ───────────────────────────────── */}
      <section className="py-12 px-5">
        <div
          ref={statsRef}
          className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {STATS.map(({ number, label }) => (
            <div
              key={label}
              className="rounded-3xl border border-[#f1e7d9] bg-white p-8 text-center shadow-sm hover:border-[#b57a2d] transition-colors"
            >
              <p className="text-4xl md:text-5xl font-black text-[#b57a2d]">
                {number}
              </p>
              <p className="mt-2 text-xs font-bold text-[#695744] tracking-wider uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Call to Action ───────────────────────────────── */}
      <section ref={ctaRef} className="px-5 pb-24 pt-8">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-[#f1e7d9] bg-linear-to-r from-[#f7ebd9] via-[#fff9f0] to-[#f7ebd9] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3f2b1a] text-amber-400">
              <MapPin size={26} />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#3f2b1a]">
                Ready to Experience Egypt Differently?
              </h2>
              <p className="text-sm text-[#695744] font-medium">
                Choose your next destination, generate an AI itinerary, or book
                a local Egyptologist guide today.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/booking"
              className="rounded-full bg-[#3f2b1a] px-8 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-[#b57a2d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book a Local Guide
            </Link>
            <Link
              to="/ai-planner"
              className="rounded-full border border-[#d9c9b0] bg-white px-8 py-3.5 text-xs font-bold text-[#3f2b1a] shadow-sm hover:border-[#b57a2d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Try AI Planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
