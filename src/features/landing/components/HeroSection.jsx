import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSearchForm from './HeroSearchForm';
import '../styles/HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

// HeroSection Component
function HeroSection() {
  const heroRef = useRef(null);
  const wordsRef = useRef([]);
  const textRef = useRef(null);
  const searchRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  const titleWords = [
    { text: 'Discover', isGradient: false },
    { text: 'Egypt', isGradient: false },
    { text: 'With', isGradient: false },
    { text: 'Another', isGradient: true },
    { text: 'Eyes', isGradient: true },
  ];

  // Initializes GSAP animations for glowing background orbs, title words, and scroll parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      if (orb1Ref.current && orb2Ref.current) {
        gsap.to(orb1Ref.current, { y: -40, x: 20, scale: 1.15, repeat: -1, yoyo: true, duration: 4, ease: 'sine.inOut' });
        gsap.to(orb2Ref.current, { y: 40, x: -20, scale: 0.9, repeat: -1, yoyo: true, duration: 5, ease: 'sine.inOut' });
      }

      tl.fromTo(
        wordsRef.current,
        { opacity: 0, y: 70, rotateX: -45, scale: 0.8 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.12, delay: 0.2 }
      )
        .fromTo(textRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo(searchRef.current, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.4');

      gsap.to(heroRef.current, {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative">
      <div ref={orb1Ref} className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none z-0" />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full bg-[#0ea5e9]/15 blur-3xl pointer-events-none z-0" />

      <div className="hero-content relative z-10">
        <h1 className="hero-title flex flex-wrap justify-center gap-x-3.5 gap-y-1 perspective-800">
          {titleWords.map((item, idx) => (
            <span
              key={idx}
              ref={(el) => (wordsRef.current[idx] = el)}
              className={`inline-block origin-bottom ${
                item.isGradient
                  ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-lg'
                  : 'text-white'
              }`}
            >
              {item.text}
            </span>
          ))}
        </h1>

        <p ref={textRef} className="hero-text mt-4">
          Explore archaeological sites, heritage trails and historical journeys across the land of pharaohs.
        </p>
      </div>

      <HeroSearchForm formRef={searchRef} />
    </section>
  );
}

export default HeroSection;
