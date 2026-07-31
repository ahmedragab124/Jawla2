import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Compass, Mail, MapPin, Phone, Globe, Share2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
  { label: "Destinations", to: "/destinations" },
  { label: "Attractions & Monuments", to: "/attractions" },
  { label: "AI Trip Planner", to: "/ai-planner" },
  { label: "Book a Tour Guide", to: "/booking" },
  { label: "About Jawla", to: "/about" },
];

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#2a1d13] via-[#20150d] to-[#160d07] text-white/80 pt-16 pb-8 border-t-2 border-[#b57a2d]/40"
    >
      {/* Decorative subtle background glow */}
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#b57a2d]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#3f2b1a]/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* 3 Columns Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b57a2d] text-white shadow-lg shadow-[#b57a2d]/30 group-hover:scale-105 transition duration-300">
                <Compass size={24} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="text-2xl font-black tracking-wide text-white group-hover:text-amber-300 transition">
                Jawla
              </span>
            </Link>
            
            <p className="text-xs leading-6 text-white/70 font-medium max-w-xs">
              Explore Egypt's pharaonic wonders, book certified Egyptologist guides, and generate custom AI itineraries for an unforgettable journey.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: Globe, label: "Website" },
                { icon: Mail, label: "Email" },
                { icon: Share2, label: "Share" },
                { icon: Phone, label: "Call" },
              ].map(({ icon: Icon, label }, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#b57a2d] hover:bg-[#b57a2d] hover:text-white hover:scale-110 cursor-pointer"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 mb-4">
              Explore Jawla
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-amber-300"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & CTA Badge */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 mb-4">
              Connect With Us
            </h4>
            
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#b57a2d] shrink-0" />
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#b57a2d] shrink-0" />
                <span>support@jawla-egypt.com</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl border border-[#b57a2d]/30 bg-white/5 p-4 space-y-2.5 backdrop-blur-sm">
              <p className="text-xs font-bold text-white">Need a Certified Guide?</p>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-[#b57a2d] px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#9b6525] hover:scale-[1.02] active:scale-98"
              >
                <span>Book Your Guide</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright & credits bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/50">
          <p>© 2026 Jawla Tourism Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-amber-300 transition">About Us</Link>
            <Link to="/destinations" className="hover:text-amber-300 transition">Destinations</Link>
            <Link to="/attractions" className="hover:text-amber-300 transition">Attractions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
