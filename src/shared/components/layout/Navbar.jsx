import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import "../../../styles/Navbar.css";
import AuthNavAction from "../../../features/auth/components/AuthNavAction";
import NavMobileMenu from "./NavMobileMenu";

// Navbar Component — Floating glassy nav bar
function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);
  const location = useLocation();

  // Entrance animation + scroll behavior
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        navRef.current,
        { y: -80, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      );

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.4",
        );
      }
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { y: -15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        );
      }

      // Scroll: transition from glass to solid when scrolling past hero
      const handleScroll = () => {
        if (window.scrollY > 50) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(39, 27, 18, 0.94)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
            backdropFilter: "blur(20px)",
            duration: 0.3,
          });
        } else {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(8, 12, 20, 0.4)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
            backdropFilter: "blur(20px)",
            duration: 0.3,
          });
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className=" fixed top-4 left-1/2 -translate-x-1/2 z-999999 w-[calc(100%-2rem)] max-w-7xl px-1">
      <nav
        ref={navRef}
        className="rounded-full px-6 py-3 text-white backdrop-blur-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/favicon.svg"
              alt="Jawla Logo"
              className="h-8 w-8 object-contain group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-xl font-black text-white group-hover:text-amber-300  transition duration-300 cursor-pointer tracking-wide">
              Jawla
            </span>
          </Link>

          <div ref={linksRef} className="hidden md:flex gap-7 items-center">
            <Link
              to="/destinations"
              className="text-white/90 font-medium hover:text-amber-300 hover:border-b hover:border-amber-300 transition duration-200 cursor-pointer text-sm py-1"
            >
              Destinations
            </Link>
            <Link
              to="/attractions"
              className="text-white/90 font-medium hover:text-amber-300 hover:border-b hover:border-amber-300 transition duration-200 cursor-pointer text-sm py-1"
            >
              Attractions
            </Link>
            <Link
              to="/ai-planner"
              className="text-white/90 font-medium hover:text-amber-300 hover:border-b hover:border-amber-300  transition duration-200 cursor-pointer text-sm py-1"
            >
              AI Planner
            </Link>
            <Link
              to="/about"
              className="text-white/90 font-medium hover:text-amber-300 hover:border-b hover:border-amber-300  transition duration-200 cursor-pointer text-sm py-1"
            >
              About
            </Link>
            <Link
              to="/booking"
              className="text-white/90 font-medium hover:text-amber-300 hover:border-b hover:border-amber-300  transition duration-200 cursor-pointer text-sm py-1"
            >
              Book a Guide
            </Link>
          </div>

          <div ref={actionsRef} className="hidden md:flex items-center gap-5">
            <Link
              to="/booking"
              className="bg-[#b57a2d] text-white px-5 py-2 rounded-full hover:bg-[#9b6525] hover:scale-105 transition duration-300 font-semibold cursor-pointer shadow-lg text-sm"
            >
              Book Now
            </Link>
            <AuthNavAction />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setOpen(!isOpen)}
              className="text-white hover:text-amber-300 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && <NavMobileMenu onClose={() => setOpen(false)} />}
      </nav>
    </div>
  );
}

export default Navbar;
