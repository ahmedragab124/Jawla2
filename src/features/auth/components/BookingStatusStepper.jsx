import { CheckCircle2, AlertCircle } from 'lucide-react';

// BookingStatusStepper Component
function BookingStatusStepper({ status }) {
  const steps = [
    { key: 'Pending', label: 'Request Sent', desc: 'Awaiting guide confirmation' },
    { key: 'Approved', label: 'Confirmed', desc: 'Guide accepted your trip' },
    { key: 'Rejected', label: 'Declined/Cancelled', desc: 'Trip cannot proceed' },
  ];

  let activeIndex = 0;
  if (status === 'Approved') activeIndex = 1;
  if (status === 'Rejected') activeIndex = 2;

  return (
    <div className="mt-4 border-t border-stone-100 pt-4">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Booking Status Progress</p>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
        {steps.map((step, idx) => {
          const isCompleted = idx <= activeIndex && status !== 'Rejected';
          const isRejectedStep = status === 'Rejected' && step.key === 'Rejected';
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.key} className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center sm:flex-1">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isRejectedStep
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : isCompleted
                    ? 'border-[#B8860B] bg-[#B8860B] text-white'
                    : isCurrent
                    ? 'border-[#B8860B] bg-[#fffaf0] text-[#B8860B] animate-pulse'
                    : 'border-stone-200 bg-white text-stone-400'
                }`}
              >
                {isRejectedStep ? (
                  <AlertCircle size={16} />
                ) : isCompleted && idx < activeIndex ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              <div className="sm:mt-2">
                <p
                  className={`text-sm font-bold ${
                    isRejectedStep
                      ? 'text-red-700'
                      : isCompleted || isCurrent
                      ? 'text-[#3f2b1a]'
                      : 'text-stone-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-stone-500 hidden sm:block mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingStatusStepper;
