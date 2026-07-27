import { Check } from "lucide-react";

function StepIndicator({ currentStep, steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200 z-0">
          <div
            className="h-full bg-[#b57a2d] transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((label, i) => {
          const num    = i + 1;
          const done   = currentStep > num;
          const active = currentStep === num;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-[#b57a2d] border-[#b57a2d] text-white"
                    : active
                    ? "bg-white border-[#b57a2d] text-[#b57a2d]"
                    : "bg-white border-stone-300 text-stone-400"
                }`}
              >
                {done ? <Check size={13} strokeWidth={3} /> : num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active ? "text-[#3f2b1a]" : done ? "text-[#b57a2d]" : "text-stone-400"
                }`}
              >
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
