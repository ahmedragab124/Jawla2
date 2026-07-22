import { Link } from 'react-router-dom';
import AuthNavAction from '../../../features/auth/components/AuthNavAction';

// NavMobileMenu Component
function NavMobileMenu({ onClose }) {
  return (
    <div className="md:hidden absolute inset-x-0 top-full bg-[#271b12]/95 border-t border-amber-100/15 backdrop-blur-xl animate-fadeIn">
      <div className="px-4 pt-3 pb-5 space-y-2">
        <Link to="/destinations" onClick={onClose} className="block px-3 py-2 rounded-xl text-white hover:bg-white/10 hover:text-amber-300 font-medium transition">
          Destinations
        </Link>
        <Link to="/attractions" onClick={onClose} className="block px-3 py-2 rounded-xl text-white hover:bg-white/10 hover:text-amber-300 font-medium transition">
          Attractions
        </Link>
        <Link to="/ai-planner" onClick={onClose} className="block px-3 py-2 rounded-xl text-white hover:bg-white/10 hover:text-amber-300 font-medium transition">
          AI Planner
        </Link>
        <Link to="/booking" onClick={onClose} className="block px-3 py-2 rounded-xl text-white hover:bg-white/10 hover:text-amber-300 font-medium transition">
          Book a Guide
        </Link>
        <Link to="/about" onClick={onClose} className="block px-3 py-2 rounded-xl text-white hover:bg-white/10 hover:text-amber-300 font-medium transition">
          About
        </Link>

        <div className="pt-2 space-y-2">
          <Link to="/booking" onClick={onClose} className="block w-full bg-[#b57a2d] text-white px-4 py-2.5 rounded-xl text-center hover:bg-[#a66c28] transition font-bold shadow-md">
            Book Now
          </Link>
          <AuthNavAction mobile />
        </div>
      </div>
    </div>
  );
}

export default NavMobileMenu;
