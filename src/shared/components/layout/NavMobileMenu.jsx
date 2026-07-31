import { Link } from "react-router-dom";
import AuthNavAction from "../../../features/auth/components/AuthNavAction";

// NavMobileMenu Component — floating dropdown matching the glassy navbar
function NavMobileMenu({ onClose }) {
  return (
    <div className="md:hidden absolute inset-x-1 -bottom-1 translate-y-full bg-[#271b12]/95 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fadeIn mt-2 z-50">
      <div className="px-4 pt-3 pb-4 space-y-1">
        <Link
          to="/destinations"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-amber-300 font-medium transition text-sm"
        >
          Destinations
        </Link>
        <Link
          to="/attractions"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-amber-300 font-medium transition text-sm"
        >
          Attractions
        </Link>
        <Link
          to="/ai-planner"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-amber-300 font-medium transition text-sm"
        >
          AI Planner
        </Link>
        <Link
          to="/booking"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-amber-300 font-medium transition text-sm"
        >
          Book a Guide
        </Link>
        <Link
          to="/about"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-amber-300 font-medium transition text-sm"
        >
          About
        </Link>

        <div className="pt-3 space-y-2">
          <Link
            to="/booking"
            onClick={onClose}
            className="block w-full bg-[#b57a2d] text-white px-4 py-2.5 rounded-full text-center hover:bg-[#a66c28] transition font-bold shadow-md text-sm"
          >
            Book Now
          </Link>
          <AuthNavAction mobile />
        </div>
      </div>
    </div>
  );
}

export default NavMobileMenu;
