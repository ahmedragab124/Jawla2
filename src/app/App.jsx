import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "../pages/LandingPage";
import BookingPage from "../features/booking/pages/BookingPage";
import NotFoundPage from "../pages/NotFoundPage";
import DestinationPage from "../pages/DestinationPage";
import DestinationsPage from "../pages/DestinationsPage";
import ScrollToTopButton from "./ScrollToTopButton";
import AuthPage from "../features/auth/pages/AuthPage";
import AdminDashboard from "../dashboards/admin/AdminDashboard";
import TouristProfile from "../dashboards/TouristProfile";
import RequireRole from "../features/auth/components/RequireRole";
import AttractionsPage from "../features/attractions/pages/AttractionsPage";
import AttractionDetailsPage from "../features/attractions/pages/AttractionDetailsPage";
import AboutPage from "../features/about/pages/AboutPage";
import AIPlannerPage from "../features/ai-planner/pages/AIPlannerPage";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destination/:id" element={<DestinationPage />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/attractions/:id" element={<AttractionDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ai-planner" element={<AIPlannerPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/profile"
            element={
              <RequireRole allowedRoles={["Tourist", "Tour Guide"]}>
                <TouristProfile />
              </RequireRole>
            }
          />
          <Route path="/booking" element={<BookingPage />} />
        </Route>

        {/* Catch-all — no Navbar/Footer */}
        <Route path="*" element={<NotFoundPage />} />

        <Route
          element={
            <RequireRole allowedRoles={["Admin"]}>
              <AdminLayout />
            </RequireRole>
          }
        >
          {/* Overview */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard tab="overview" />}
          />

          {/* People */}
          <Route
            path="/admin/dashboard/guides"
            element={<AdminDashboard tab="guides" />}
          />
          <Route
            path="/admin/dashboard/tourists"
            element={<AdminDashboard tab="tourists" />}
          />
          <Route
            path="/admin/dashboard/bookings"
            element={<AdminDashboard tab="bookings" />}
          />

          {/* Attractions */}
          <Route
            path="/admin/dashboard/attractions/add"
            element={<AdminDashboard tab="addattraction" />}
          />
          <Route
            path="/admin/dashboard/attractions/view"
            element={<AdminDashboard tab="viewattractions" />}
          />
          <Route
            path="/admin/dashboard/attractions/edit/:id"
            element={<AdminDashboard tab="editattraction" />}
          />

          {/* Destinations */}
          <Route
            path="/admin/dashboard/destinations/add"
            element={<AdminDashboard tab="adddestination" />}
          />
          <Route
            path="/admin/dashboard/destinations/view"
            element={<AdminDashboard tab="viewdestinations" />}
          />
          <Route
            path="/admin/dashboard/destinations/edit/:id"
            element={<AdminDashboard tab="editdestination" />}
          />
        </Route>
      </Routes>

      <ScrollToTopButton />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
