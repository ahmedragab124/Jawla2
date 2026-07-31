import { Compass } from "lucide-react";

export function PageLoader({ text = "Loading Jawla..." }) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div className="absolute h-20 w-20 rounded-full border-2 border-[#b57a2d]/30 animate-ping" />
        
        {/* Spinning gradient ring */}
        <div className="h-16 w-16 rounded-full border-4 border-t-[#b57a2d] border-r-[#3f2b1a] border-b-[#f1e7d9] border-l-[#b57a2d] animate-spin" />
        
        {/* Center compass icon */}
        <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-[#3f2b1a] text-[#b57a2d] shadow-md">
          <Compass size={22} className="animate-pulse" />
        </div>
      </div>

      {/* Brand & Loading Label */}
      <h3 className="mt-6 text-lg font-black text-[#3f2b1a] tracking-wide">
        Jawla
      </h3>
      <p className="mt-1 text-xs font-semibold text-[#b57a2d] tracking-wider uppercase animate-pulse">
        {text}
      </p>
    </div>
  );
}

export default PageLoader;
