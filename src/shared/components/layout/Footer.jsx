import { useEffect, useRef } from 'react';
import { Globe, Share2, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-[#fffaf0] via-[#f7ebd9] to-[#ebd9c5] pt-20 pb-12 border-t border-[#f0dfcc]">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-lg space-y-5">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/favicon.svg" alt="Jawla Logo" className="h-9 w-9 object-contain" />
              <h3 className="text-3xl font-black text-[#3f2b1a]">Jawla</h3>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#695540]">
              Defining the next generation of Egyptian tourism through heritage, luxury, and AI-assisted personalized travel experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e3ce] text-[#3f2b1a] transition hover:bg-[#b57a2d] hover:text-white hover:scale-110 shadow-xs cursor-pointer">
              <Globe size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e3ce] text-[#3f2b1a] transition hover:bg-[#b57a2d] hover:text-white hover:scale-110 shadow-xs cursor-pointer">
              <Share2 size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e3ce] text-[#3f2b1a] transition hover:bg-[#b57a2d] hover:text-white hover:scale-110 shadow-xs cursor-pointer">
              <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-bold text-[#3f2b1a]">Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-[#695540]">
              <li>
                <Link to="/attractions" className="hover:text-[#b57a2d] transition-colors">
                  Attractions
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#b57a2d] transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/ai-planner" className="hover:text-[#b57a2d] transition-colors">
                  AI Planner
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#b57a2d] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#b57a2d] transition-colors">
                  Book a Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-[#e5d3be] pt-8 px-6 text-sm text-[#7a644d] sm:px-8">
        <p>© 2026 Jawla. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-bold text-[#3f2b1a] hover:text-[#b57a2d] transition-colors cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-900/10 shadow-xs hover:scale-105"
        >
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
