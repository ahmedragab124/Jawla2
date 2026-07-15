import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import './css-layout/Navbar.css';
import AuthNavAction from '../features/auth/AuthNavAction';

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <nav className="relative px-6 py-4 nnv text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/favicon.svg" alt="Jawla Logo" className="h-9 w-9 object-contain" />
            <span className="text-2xl font-bold text-white group-hover:text-amber-200 transition cursor-pointer">
              Jawla
            </span>
          </Link>

        
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/destinations" className="text-white font-medium hover:text-amber-200 transition cursor-pointer hover:border-b-2 hover:border-amber-200">
              Destinations
            </Link>
            <Link to="/attractions" className="text-white font-medium hover:text-amber-200 transition cursor-pointer hover:border-b-2 hover:border-amber-200">
              Attractions
            </Link>
            <Link to="/about" className="text-white font-medium hover:text-amber-200 transition cursor-pointer hover:border-b-2 hover:border-amber-200">
              About
            </Link>
            <Link to="/booking" className="text-white font-medium hover:text-amber-200 transition cursor-pointer hover:border-b-2 hover:border-amber-200">
              Book a Guide
            </Link>
           
          </div>

        
          <div className="hidden md:flex items-center gap-6">
            <Link to="/booking" className="bg-[#b57a2d] text-white px-6 py-2 rounded-full hover:bg-[#9b6525] transition font-medium cursor-pointer">
              Book Now
            </Link>
            <AuthNavAction />
          </div>

        
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setOpen(!isOpen)}
              className="text-white hover:text-amber-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute inset-x-0 top-full bg-[#271b12]/95 border-t border-amber-100/15 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/destinations"
                className="block px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-amber-200 font-medium"
              >
                Destinations
              </Link>
              <Link
                to="/attractions"
                className="block px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-amber-200 font-medium"
              >
                Attractions
              </Link>
              <Link
                to="/booking"
                className="block px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-amber-200 font-medium"
              >
                Book a Guide
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-amber-200 font-medium"
              >
                About
              </Link>
             
              <div className="px-3 py-2 space-y-2">
                <Link to="/booking" className="block w-full bg-[#b57a2d] text-white px-4 py-2 rounded text-center hover:bg-[#a66c28] transition font-medium">
                  Book Now
                </Link>
                <AuthNavAction mobile />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
