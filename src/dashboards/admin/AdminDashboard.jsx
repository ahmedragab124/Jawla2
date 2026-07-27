import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../supabase";
import AdminStatsGrid from "./components/AdminStatsGrid";
import GuideRegistrationsTable from "./components/GuideRegistrationsTable";
import BookingsTable from "./components/BookingsTable";
import TouristsTable from "./components/TouristsTable";
import Addattraction from "./components/Attraction/Addattraction";
import ViewAttractions from "./components/Attraction/ViewAttractions";
import EditAttraction from "./components/Attraction/EditAttraction";
import AddDestination from "./components/Destination/AddDestination";
import ViewDestinations from "./components/Destination/ViewDestinations";
import EditDestination from "./components/Destination/EditDestination";

// AdminDashboard Component
function AdminDashboard({ tab = "overview" }) {
  const [tourists, setTourists] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Loads initial dashboard data (tourists, tour guides, and bookings) from Supabase
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [
          { data: users, error: usersError },
          { data: guides, error: guidesError },
          { data: bookingsData, error: bookingsError },
        ] = await Promise.all([
          supabase.from("users").select("*").eq("role", "Tourist"),
          supabase.from("tourGuides").select("*"),
          supabase.from("bookings").select("*"),
        ]);

        if (usersError) throw usersError;
        if (guidesError) throw guidesError;
        if (bookingsError) throw bookingsError;

        setTourists(users || []);
        setTourGuides(guides || []);
        setBookings(bookingsData || []);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Approves a pending tour guide registration application
  const handleApproveGuide = async (guideId) => {
    const { error } = await supabase
      .from("tourGuides")
      .update({ status: "Approved" })
      .eq("id", guideId);
    if (error) return toast.error("Failed to approve guide");
    toast.success("Guide approved");
    setTourGuides((prev) =>
      prev.map((g) => (g.id === guideId ? { ...g, status: "Approved" } : g)),
    );
  };

  // Rejects a pending tour guide registration application
  const handleRejectGuide = async (guideId) => {
    if (
      !window.confirm("Are you sure you want to reject this guide application?")
    )
      return;
    const { error } = await supabase
      .from("tourGuides")
      .update({ status: "Rejected" })
      .eq("id", guideId);
    if (error) return toast.error("Failed to reject guide");
    toast.success("Guide rejected");
    setTourGuides((prev) =>
      prev.map((g) => (g.id === guideId ? { ...g, status: "Rejected" } : g)),
    );
  };

  // Deletes a booking from the system
  const handleDeleteBooking = async (bookingId) => {
    if (
      !window.confirm("Are you sure you want to delete this booking request?")
    )
      return;
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);
    if (error) return toast.error("Failed to delete booking");
    toast.success("Booking deleted");
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Tabs that don't need the full data load can render immediately
  const standaloneTab = [
    "addattraction",
    "viewattractions",
    "editattraction",
    "adddestination",
    "viewdestinations",
    "editdestination",
  ].includes(tab);

  if (loading && !standaloneTab) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl animate-fadeUp">
      {/* Header — shown for overview/guides/tourists/bookings only */}
      {!standaloneTab && (
        <header className="mb-8">
          <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">
            System Controller
          </p>
          <h1 className="mt-2 text-4xl font-black text-[#3f2b1a]">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-[#695744]">
            {tab === "overview" &&
              "System status overview, active registrations, and general statistics."}
            {tab === "guides" &&
              "Manage tour guide registration applications and verification status."}
            {tab === "tourists" &&
              "View registered tourists currently using the platform."}
            {tab === "bookings" && "Oversee and manage booking requests."}
          </p>
        </header>
      )}

      {/* ── Overview ─────────────────────────────────────── */}
      {tab === "overview" && (
        <section className="space-y-8">
          <AdminStatsGrid
            touristsCount={tourists.length}
            guidesCount={tourGuides.length}
            bookingsCount={bookings.length}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
              <h3 className="text-lg font-bold text-[#3f2b1a] mb-4">
                Pending Registrations
              </h3>
              <p className="text-sm text-stone-500 mb-4">
                There are{" "}
                {
                  tourGuides.filter((g) => g.status === "Pending approval")
                    .length
                }{" "}
                tour guide applications awaiting review.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
              <h3 className="text-lg font-bold text-[#3f2b1a] mb-4">
                Booking Activity
              </h3>
              <p className="text-sm text-stone-500 mb-4">
                There are{" "}
                {bookings.filter((b) => b.status === "Pending").length} pending
                booking requests requiring attention.
              </p>
            </div>
          </div>
        </section>
      )}

      {tab === "guides" && (
        <GuideRegistrationsTable
          tourGuides={tourGuides}
          onApprove={handleApproveGuide}
          onReject={handleRejectGuide}
        />
      )}

      {tab === "bookings" && (
        <BookingsTable
          bookings={bookings}
          tourGuides={tourGuides}
          onDelete={handleDeleteBooking}
        />
      )}

      {tab === "tourists" && <TouristsTable tourists={tourists} />}

      {/* ── Attractions ─────────────────────────────────── */}
      {tab === "addattraction" && <Addattraction />}
      {tab === "viewattractions" && <ViewAttractions />}
      {tab === "editattraction" && <EditAttraction />}

      {/* ── Destinations ────────────────────────────────── */}
      {tab === "adddestination" && <AddDestination />}
      {tab === "viewdestinations" && <ViewDestinations />}
      {tab === "editdestination" && <EditDestination />}
    </div>
  );
}

export default AdminDashboard;
