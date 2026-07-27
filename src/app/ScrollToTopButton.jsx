import { useState, useEffect } from "react";
import { CircleArrowUp } from "lucide-react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleGoToTop}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#3f2b1a] text-white shadow-2xl shadow-black/30 transition-all duration-500 cursor-pointer border-2 border-white/20
        ${visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }
        hover:bg-[#b57a2d] hover:scale-110 active:scale-95`}
    >
      <CircleArrowUp size={24} />
    </button>
  );
}

export default ScrollToTopButton;
