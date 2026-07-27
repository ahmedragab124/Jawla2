import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSearchForm from "./HeroSearchForm";
import "../styles/HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const heroRef = useRef(null);
  const wordsRef = useRef([]);
  const textRef = useRef(null);
  const searchRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const scrollHintRef = useRef(null);

  const titleWords = [
    { text: "Discover", isGradient: false },
    { text: "Egypt", isGradient: false },
    { text: "With", isGradient: false },
    { text: "Another", isGradient: true },
    { text: "Eyes", isGradient: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [orb1Ref.current, orb2Ref.current, wordsRef.current, searchRef.current],
        {
          force3D: true,
        },
      );

      // Orb floating animation
      if (orb1Ref.current && orb2Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -20,
          x: 10,
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 6,
          ease: "sine.inOut",
        });
        gsap.to(orb2Ref.current, {
          y: 20,
          x: -10,
          scale: 0.95,
          repeat: -1,
          yoyo: true,
          duration: 7,
          ease: "sine.inOut",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        wordsRef.current,
        {
          opacity: 0,
          y: 35,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.22,
          delay: 0.2,
          ease: "power1.out",
        },
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.8",
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.6",
        );

      // Scroll hint bounce animation
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });

        // Fade out scroll hint when scrolling
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "20% top",
            scrub: true,
          },
        });
      }

      // Hero parallax on scroll
      gsap.to(".hero-content", {
        y: 60,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative overflow-hidden">
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-amber-500/20 blur-2xl pointer-events-none z-0 will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-[#0ea5e9]/15 blur-2xl pointer-events-none z-0 will-change-transform"
      />

      <div className="hero-content relative z-10 will-change-transform">
        <h1 className="hero-title flex flex-wrap justify-center gap-x-3.5 gap-y-1">
          {titleWords.map((item, idx) => (
            <span
              key={idx}
              ref={(el) => (wordsRef.current[idx] = el)}
              className={`inline-block ${
                item.isGradient
                  ? "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-md"
                  : "text-white"
              }`}
            >
              {item.text}
            </span>
          ))}
        </h1>

        <p ref={textRef} className="hero-text mt-4">
          Explore archaeological sites, heritage trails and historical journeys
          across the land of pharaohs.
        </p>
      </div>

      <HeroSearchForm formRef={searchRef} />

      {/* Scroll Hint Indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-white/60 tracking-widest uppercase">
          Scroll
        </span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <ChevronDown size={12} className="text-white/70" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
