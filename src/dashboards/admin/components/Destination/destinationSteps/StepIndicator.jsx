import { Check } from "lucide-react";

function StepIndicator({ currentStep, steps }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-stone-200 z-0">
          <div
            className="h-full bg-[#b57a2d] transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((label, i) => {
          const num    = i + 1;
          const done   = currentStep > num;
          const active = currentStep === num;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold text-sm transition-all duration-300 ${
                done   ? "bg-[#b57a2d] border-[#b57a2d] text-white shadow-md"
                : active ? "bg-white border-[#b57a2d] text-[#b57a2d] shadow-lg scale-110"
                         : "bg-white border-stone-300 text-stone-400"
              }`}>
                {done ? <Check size={16} strokeWidth={3} /> : num}
              </div>
              <span className={`text-xs font-semibold hidden sm:block transition-colors ${
                active ? "text-[#3f2b1a]" : done ? "text-[#b57a2d]" : "text-stone-400"
              }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepIndicator;
