import { Globe, Share2, Mail } from 'lucide-react'
import useRevealOnScroll from './../hooks/useRevealOnScroll';
import { Link } from 'react-router-dom';

function Footer() {

    const revealRef = useRevealOnScroll()

  return (
    <footer ref={revealRef} className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-lg space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-[#0f3344]">Explore Egypt</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#475569]">
              Defining the next generation of Egyptian tourism through heritage, luxury, and technology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8eaf5] text-[#0f4a62] transition hover:bg-[#c7dfee]">
              <Globe size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8eaf5] text-[#0f4a62] transition hover:bg-[#c7dfee]">
              <Share2 size={18} />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d8eaf5] text-[#0f4a62] transition hover:bg-[#c7dfee]">
              <Mail size={18} />
            </button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-[#0f3344]">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-[#475569]">
            <Link  to="/Attractions" >
              <li className='my-2'>Attractions</li>
            </Link>  
            <Link to='/Destinations'>
            <li className='my-2'>Destinations</li>
            </Link>
          
            <Link  to="/about"  >
              <li className='my-2'>About</li>
            </Link>
         
            
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-[#d8e3ea] pt-6 px-6 text-sm text-[#64748b] sm:px-8">
        © 2026 Explore Egypt. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
