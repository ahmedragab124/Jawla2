import { Link } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';

// BookingUnauthNotice Component
function BookingUnauthNotice() {
  return (
    <div className="relative w-full max-w-150 overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/30 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-center animate-fadeUp">
      <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[#B8860B]/20 blur-3xl" />

      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md shadow-lg">
          <FaCompass className="text-3xl text-[#B8860B] animate-pulse" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#8B5E3C] leading-tight">
        Ready to Explore?
      </h2>
      <p className="mt-3 mb-6 text-sm sm:text-base text-[#5C4B3B] max-w-md mx-auto">
        Please log in to your account to book a custom local guide and discover Egypt's hidden wonders.
      </p>

      <Link
        to="/auth"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C79A2D] to-[#8B5E3C] px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 hover:-translate-y-0.5"
      >
        Login to Jawla
      </Link>
    </div>
  );
}

export default BookingUnauthNotice;
