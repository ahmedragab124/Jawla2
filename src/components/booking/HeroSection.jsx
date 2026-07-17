import hero from "../../assets/guide-booking-hero.jpg";
import BookingForm from "./BookingForm";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section
            className="relative min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${hero})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#3b2a1c]/55 via-[#8B5E3C]/25 to-[#B8860B]/15"></div>

            <div className="relative z-10 mx-auto flex flex-col lg:flex-row min-h-screen max-w-7xl items-center justify-center lg:justify-between gap-12 lg:gap-16 px-6 py-24 lg:py-10 lg:px-10">

                {/* Left Content */}
                <div className="max-w-lg text-center lg:text-left">

                    <p className="mb-3 text-lg font-medium uppercase tracking-[3px] text-[#F4D58D]">
                        Your Journey Starts Here
                        <br />
                        Find Your Perfect Guide
                    </p>

                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Explore the
                        <br />
                        Beauty of
                        <span className="text-[#F4D58D]"> Egypt</span>
                    </h1>

                    <p className="mt-6 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                        Book a trusted local guide and discover the beauty of
                        Egypt through its temples, the Nile, and authentic
                        Nubian culture.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                        <Link
                            to="/"
                            className="rounded-xl border border-white/50 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                        >
                            ← Explore with Jawla
                        </Link>
                        <Link
                            to="/profile"
                            className="rounded-xl bg-[#B8860B] px-6 py-3 font-semibold text-white transition hover:bg-[#8B5E3C]"
                        >
                            View Bookings →
                        </Link>
                    </div>

                </div>

                {/* Booking Form */}
                <div className="w-full max-w-150 lg:ml-16">
                    <BookingForm />
                </div>

            </div>
        </section>
    );
}

export default HeroSection;
