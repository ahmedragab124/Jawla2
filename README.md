# 🇪🇬 Jawla (جولة) - Explore Egypt's Wonders & Heritage Trails

**Jawla (جولة)** is a modern, full-stack web application designed to revolutionize Egyptian tourism. Powered by **React 19**, **Vite**, **Supabase**, and **Google Gemini AI**, Jawla offers personalized AI-driven trip planning, certified Egyptologist tour guide bookings, interactive destination exploration with live weather updates, and comprehensive role-based dashboards.

---

## 🌟 Key Features

### 🤖 1. AI Trip Planner (Powered by Google Gemini API)
- **Customized Itineraries**: Generates day-by-day tailored travel schedules (1 to 7 days) based on tourist interests (Historical, Pyramids, Museums, Culinary, Shopping, Photography, etc.).
- **Smart Constraints**: Ensures non-duplicate attraction visits, maximum 5 stops per day, and intelligent time slot allocations.
- **Local Persistence**: Saves up to 30 generated itineraries locally per user (`aiTripsStorage.js`), allowing tourists to review past plans anytime.

### 🏛️ 2. Destinations & Attractions Explorer
- **Interactive Destination Guides**: Detailed pages for Egyptian cities (Cairo, Luxor, Aswan, Alexandria, etc.) with history summaries, heritage panels, and dynamic experience carousels.
- **Live Weather Integration**: Connects with the **Open-Meteo API** to display real-time weather forecasts based on exact destination latitude/longitude coordinates.
- **Filterable Attraction Gallery**: Search by name or filter by categories (Historical, Temples, Pyramids, Museums, Culture) with GSAP-powered animated category tabs.

### 👨‍🏫 3. Certified Tour Guide Booking System
- **Guide Directory & Selection**: Browse approved Egyptologist tour guides with specialty filters and experience stats.
- **Seamless Booking Flow**: Submit booking requests with date selection, guest count, custom preferences, and guide selection.
- **Real-Time Booking Status Stepper**: Visual progress tracker (**Pending** ➔ **Approved** / **Rejected**) for tourists.

### 🔑 4. Role-Based Access Control & Dashboards

The application supports three distinct user roles with protected routes (`RequireRole` component):

| Role | Core Capabilities | Dashboard Route |
| :--- | :--- | :--- |
| **Tourist** | Manage profile, view saved AI itineraries, track booking status & access approved guide contact info (Phone / WhatsApp / Email). | `/profile` |
| **Tour Guide** | Review pending booking requests, accept bookings with custom guide notes, decline requests, and monitor approval status. | `/profile` |
| **Admin** | Full system overview & metrics, tourist list, tour guide registration approval/rejection, and CRUD managers for Destinations & Attractions. | `/admin/dashboard/*` |

---

## 🏗️ Architecture & Directory Workflow

```
src/
├── app/
│   └── App.jsx                 # Central router with MainLayout & AdminLayout sub-trees
├── dashboards/
│   ├── admin/                  # Admin Dashboard, GuideRegistrations, TouristsTable
│   │   ├── components/Attraction/  # Addattraction (4-step wizard), EditAttraction, ViewAttractions
│   │   └── components/Destination/ # AddDestination (5-step wizard), EditDestination, ViewDestinations
│   ├── tourist/                # Tourist Dashboard, AITripsList, BookingCard, TouristProfileSidebar
│   ├── tourguide/              # Tour Guide Dashboard, GuideBookingCard, TourGuideProfileCard
│   └── TouristProfile.jsx      # Role-based profile wrapper router
├── features/
│   ├── about/                  # About page with brand metrics & values
│   ├── ai-planner/             # AI Planner page, Gemini API service, prompt builder, storage
│   ├── attractions/            # Attractions gallery page & details view
│   ├── auth/                   # Authentication (AuthPage, AuthContext, RequireRole guard)
│   ├── booking/                # Booking page, BookingForm, validation & toast feedback
│   ├── destinations/           # Destination page components (InfoPanel, ExperienceSection, Weather)
│   └── landing/                # HeroSection, PopularSection, FeatureSection, HeroSearchForm
├── hooks/
│   └── useSEO.js               # Dynamic document title & meta tag management
├── layout/
│   ├── MainLayout.jsx          # Public layout shell (Navbar + Outlet + Footer)
│   └── AdminLayout.jsx         # Protected admin layout shell (Sidebar + Outlet)
├── pages/                      # LandingPage, DestinationsPage, DestinationPage, NotFoundPage
├── shared/
│   ├── Slider.jsx              # Admin sidebar navigation
│   └── components/layout/      # Navbar, Footer, NavMobileMenu
├── index.css                   # Global styles & Tailwind CSS v4 setup
├── main.jsx                    # Entry point wrapping AuthProvider, BrowserRouter & ToastContainer
└── supabase.js                 # Supabase client instantiation
```

---

## 🗄️ Database Schema (Supabase)

The project connects to **Supabase** with 5 primary database tables:

1. **`users`**: Stores user credentials (`id`, `name`, `email`, `role`, `phone`, `avatar`, `location`, `bio`).
2. **`tourGuides`**: Stores guide profiles & approval status (`id`, `name`, `email`, `phone`, `status`: `'Pending approval' | 'Approved' | 'Rejected'`, `experienceYears`).
3. **`destinations`**: Stores destination data (`id`, `name`, `capital`, `weatherLabel`, `heroImage`, `image`, `heroTitle`, `description`, `history`, `latitude`, `longitude`, `experienceDescription`, `experiences` (JSONB array)).
4. **`attractions`**: Stores landmark records (`id`, `destinationId`, `name`, `category`, `description`, `image`, `duration`, `bestTime`, `star`).
5. **`bookings`**: Tracks tourist guide reservations (`id`, `touristId`, `touristName`, `touristEmail`, `guideId`, `tourType`, `people`, `date`, `phone`, `requests`, `status`: `'Pending' | 'Approved' | 'Rejected'`, `guideNote`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 & Vite 8
- **Routing**: React Router DOM v7
- **Database**: Supabase Client JS (`@supabase/supabase-js`)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (GreenSock) & ScrollTrigger
- **Icons**: Lucide React
- **Notifications**: React-Toastify
- **AI Model**: Google Gemini API (`@google/generative-ai` / REST integration)
- **APIs**: Open-Meteo Forecast API

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**

### 2. Environment Variables Setup
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-google-gemini-api-key
```

### 3. Installation & Development

```bash
# Clone repository
git clone https://github.com/ahmedragab124/Jawla2.git
cd Jawla3

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 📝 License

Distributed under the MIT License. Created with ❤️ for Egypt's Heritage.
