import { useEffect, useRef } from 'react';
import { Globe, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Attractions',  to: '/attractions'  },
  { label: 'AI Planner',   to: '/ai-planner'   },
  { label: 'About',        to: '/about'        },
  { label: 'Book a Guide', to: '/booking'      },
];

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top bottom' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);


  return (
    <footer
      ref={footerRef}
      className="bg-[#271b12] py-10"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">

        {/* Main row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="Jawla Logo" className="h-9 w-9 object-contain" />
            <span className="text-xl font-black text-white">Jawla</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-white/70 transition-colors hover:text-amber-400"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[Globe, Share2, Mail].map((Icon, i) => (
              <button
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#b57a2d] hover:text-white hover:scale-110 cursor-pointer"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/40">
          © 2026 Jawla. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
