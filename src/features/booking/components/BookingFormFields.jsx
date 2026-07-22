import { FaUser, FaPhone, FaEnvelope, FaUsers, FaCalendarAlt, FaMapMarkedAlt, FaSpinner } from 'react-icons/fa';
import InputField from './InputField';
import SelectField from './SelectField';

// BookingFormFields Component
function BookingFormFields({ formData, onChange, today, guidesLoading, guideOptions }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField icon={<FaUser />} label="Full Name" name="fullName" value={formData.fullName} onChange={onChange} readOnly />
        <InputField icon={<FaPhone />} label="Phone Number" placeholder="+20 123456789" name="phone" value={formData.phone} onChange={onChange} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField icon={<FaEnvelope />} label="Email" type="email" name="email" value={formData.email} onChange={onChange} readOnly />
        <InputField icon={<FaUsers />} label="Number of People" type="number" placeholder="2" name="people" value={formData.people} onChange={onChange} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField icon={<FaCalendarAlt />} label="Preferred Date" type="date" name="date" value={formData.date} onChange={onChange} min={today} />
        <SelectField icon={<FaMapMarkedAlt />} label="Tour Type" name="tourType" value={formData.tourType} onChange={onChange} options={["Historical Tour", "Cultural Tour", "Adventure Tour", "Food Tour"]} />
      </div>

      <div className="mt-3">
        {guidesLoading ? (
          <div className="flex items-center gap-2 rounded-xl border border-[#D8C3A5] bg-white/20 py-3 px-4 text-xs text-[#8B7355]">
            <FaSpinner className="animate-spin text-[#B8860B]" size={14} /> Loading available guides...
          </div>
        ) : (
          <SelectField icon={<FaUser />} label="Preferred Tour Guide" name="guideId" value={formData.guideId} onChange={onChange} options={guideOptions} />
        )}
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-semibold text-[#4A3728]">Special Requests</label>
        <textarea rows="2" name="requests" value={formData.requests} onChange={onChange} placeholder="Tell us anything you'd like to add..." className="w-full resize-none rounded-xl border border-[#D8C3A5] bg-white/20 p-3 text-sm outline-none focus:border-[#B8860B]" />
      </div>
    </>
  );
}

export default BookingFormFields;
