import { Routes, Route } from 'react-router-dom'
import Landingpage from './page/Landingpage'
import BookingHero from './components/booking/HeroSection'
import NotFound from './components/booking/NotFound'
import DestinationPage from './page/DestinationPage'
import DestinationsPage from './page/DestinationsPage'
import './App.css'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { CircleArrowUp } from 'lucide-react';
import AuthPage from './features/auth/AuthPage'
import AdminDashboard from './features/auth/AdminDashboard'
import TouristProfile from './features/auth/TouristProfile'
import RequireRole from './features/auth/RequireRole'
import AttractionsPage from './features/attractions/AttractionsPage'
import AboutPage from './features/about/AboutPage'


function App() {
  

  const handlegototop = ()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' })
  }



  return (

    <>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/destination/:id" element={<DestinationPage />} />
      <Route path="/attractions" element={<AttractionsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin/dashboard" element={<RequireRole allowedRoles={['Admin']}><AdminDashboard /></RequireRole>} />
      <Route path="/profile" element={<RequireRole allowedRoles={['Tourist', 'Tour Guide']}><TouristProfile /></RequireRole>} />
      <Route path="/booking" element={<BookingHero />} />
      <Route path="*" element={<NotFound />} />
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
