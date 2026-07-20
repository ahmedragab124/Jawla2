import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import BookingPage from '../features/booking/pages/BookingPage'
import NotFoundPage from '../pages/NotFoundPage'
import DestinationPage from '../pages/DestinationPage'
import DestinationsPage from '../pages/DestinationsPage'
import Navbar from '../shared/components/layout/Navbar'
import Footer from '../shared/components/layout/Footer'
import { CircleArrowUp } from 'lucide-react';
import AuthPage from '../features/auth/pages/AuthPage'
import AdminDashboard from '../features/auth/pages/AdminDashboard'
import TouristProfile from '../features/auth/pages/TouristProfile'
import RequireRole from '../features/auth/components/RequireRole'
import AttractionsPage from '../features/attractions/pages/AttractionsPage'
import AttractionDetailsPage from '../features/attractions/pages/AttractionDetailsPage'
import AboutPage from '../features/about/pages/AboutPage'
import AIPlannerPage from '../features/ai-planner/pages/AIPlannerPage'


function App() {
  

  const handlegototop = ()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  return (

    <>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/destination/:id" element={<DestinationPage />} />
      <Route path="/attractions" element={<AttractionsPage />} />
      <Route path="/attractions/:id" element={<AttractionDetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ai-planner" element={<AIPlannerPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin/dashboard" element={<RequireRole allowedRoles={['Admin']}><AdminDashboard /></RequireRole>} />
      <Route path="/profile" element={<RequireRole allowedRoles={['Tourist', 'Tour Guide']}><TouristProfile /></RequireRole>} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />


          <button
        onClick={handlegototop}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#44390f] text-white shadow-2xl shadow-black/20 transition hover:bg-[#e6e691]"
      >
        <CircleArrowUp size={28} />
      </button>
    
    </>
  )
}

export default App
