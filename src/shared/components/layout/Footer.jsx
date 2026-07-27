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
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-[#ecdfc9] bg-[#fdf7ee] py-8"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">

        {/* Main row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="Jawla Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-black text-[#3f2b1a]">Jawla</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-[#695744] transition-colors hover:text-[#b57a2d]"
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
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e3ce] text-[#3f2b1a] transition hover:bg-[#b57a2d] hover:text-white hover:scale-110 cursor-pointer"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-[#ecdfc9] pt-4 text-center text-xs text-[#9a7d63]">
          © 2026 Jawla. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
