import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Home, ArrowLeft, Compass } from "lucide-react";

// Animated floating dots background
function FloatingDots() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#b57a2d] opacity-[0.06] animate-pulse"
          style={{
            width:  `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
            top:    `${Math.random() * 100}%`,
            left:   `${Math.random() * 100}%`,
            animationDelay:    `${(i * 0.4).toFixed(1)}s`,
            animationDuration: `${(Math.random() * 3 + 3).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}

function NotFoundPage() {
  const navigate  = useNavigate();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: "linear-gradient(135deg, #fdf8f2 0%, #fff7eb 60%, #fdf3e4 100%)", fontFamily: "'Outfit', sans-serif" }}
    >
      <FloatingDots />

      {/* Logo / Brand */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 group">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3f2b1a] text-white shadow-md group-hover:bg-[#b57a2d] transition-colors duration-300">
          <Compass size={18} />
        </div>
        <span className="text-xl font-black text-[#3f2b1a] group-hover:text-[#b57a2d] transition-colors duration-300">
          Jawla
        </span>
      </Link>

      {/* 404 Number */}
      <div className="relative mb-4 select-none">
        <p
          className="text-[170px] sm:text-[220px] font-black leading-none tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #f1e7d9 0%, #e0c9a8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          404
        </p>
        {/* Compass icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#b57a2d] shadow-2xl shadow-[#b57a2d]/30 animate-spin-slow">
            <Compass size={40} className="text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b57a2d]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#b57a2d]" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#b57a2d]" />
      </div>

      {/* Text */}
      <h1 className="text-3xl sm:text-4xl font-black text-[#3f2b1a] mb-3">
        Lost on the Map?
      </h1>
      <p className="max-w-md text-base text-[#695744] leading-relaxed mb-10">
        The page you are looking for doesn't exist or has been moved.
        Let's get you back on the right trail.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-[#3f2b1a] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#3f2b1a]/20 transition-all duration-300 hover:bg-[#b57a2d] hover:scale-105 active:scale-95"
        >
          <Home size={16} />
          Back to Home
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-full border-2 border-[#d9c9b0] bg-white px-8 py-3.5 text-sm font-bold text-[#695744] shadow-sm transition-all duration-300 hover:border-[#b57a2d] hover:text-[#3f2b1a] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[#b57a2d]">
        {[
          { label: "Destinations", to: "/destinations" },
          { label: "Attractions",  to: "/attractions"  },
          { label: "AI Planner",   to: "/ai-planner"   },
          { label: "About Us",     to: "/about"        },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="underline underline-offset-4 decoration-[#d9c9b0] hover:decoration-[#b57a2d] hover:text-[#9b6525] transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 rounded-full bg-[#b57a2d] transition-all duration-300"
            style={{ width: i === 1 ? "24px" : "8px", opacity: i === 1 ? 1 : 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

export default NotFoundPage;
