import { useState } from "react";

import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaUsers,
    FaCalendarAlt,
    FaMapMarkedAlt,
    FaCompass,
    FaSpinner,
} from "react-icons/fa";

import InputField from "./InputField";
import SelectField from "./SelectField";

function BookingForm({ bookings, setBookings }) {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        people: "",
        date: "",
        tourType: "Historical Tour",
        requests: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setSuccessMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.fullName.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.date
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!/^\d{11}$/.test(formData.phone)) {
            alert("Phone number must contain 11 digits.");
            return;
        }

        if (formData.people && Number(formData.people) <= 0) {
            alert("Number of people must be greater than 0.");
            return;
        }

        if (formData.date < today) {
            alert("Please select today or a future date.");
            return;
        }

        setLoading(true);

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                const updatedBookings = [...bookings, formData];

                setBookings(updatedBookings);

                localStorage.setItem(
                    "bookings",
                    JSON.stringify(updatedBookings)
                );

                setSuccessMessage(
                    "✅ Your booking request has been submitted successfully!"
                );

                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    people: "",
                    date: "",
                    tourType: "Historical Tour",
                    requests: "",
                });
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="relative w-full max-w-150 overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/30 bg-white/10 p-3 sm:p-5 lg:p-7 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] sm:shadow-[0_15px_45px_rgba(0,0,0,0.35)] animate-fadeUp">

            <form onSubmit={handleSubmit}>

                {/* Glass Highlight */}
                <div className="pointer-events-none absolute -top-12 -left-12 h-32 sm:h-48 w-32 sm:w-48 rounded-full bg-white/20 blur-3xl"></div>

                <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 sm:h-60 w-40 sm:w-60 rounded-full bg-[#B8860B]/20 blur-3xl"></div>

                {/* Compass */}
                <div className="mb-3 sm:mb-4 flex justify-center">
                    <div className="flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md shadow-lg">
                        <FaCompass className="text-xl sm:text-2xl text-[#B8860B]" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8B5E3C] leading-tight">
                    Find Your Perfect Guide
                </h2>

                <p className="mt-2 mb-4 sm:mb-6 text-center text-xs sm:text-sm lg:text-base text-[#5C4B3B]">
                    Customize your trip with ease & local experts
                </p>

                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
                    <InputField
                        icon={<FaUser />}
                        label="Full Name"
                        placeholder="Your Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <InputField
                        icon={<FaPhone />}
                        label="Phone Number"
                        placeholder="+20 123456789"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 2 */}
                <div className="mt-2 sm:mt-4 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
                    <InputField
                        icon={<FaEnvelope />}
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <InputField
                        icon={<FaUsers />}
                        label="Number of People"
                        type="number"
                        placeholder="2"
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 3 */}
                <div className="mt-2 sm:mt-4 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
                    <InputField
                        icon={<FaCalendarAlt />}
                        label="Preferred Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                    />

                    <SelectField
                        icon={<FaMapMarkedAlt />}
                        label="Tour Type"
                        name="tourType"
                        value={formData.tourType}
                        onChange={handleChange}
                        options={[
                            "Historical Tour",
                            "Cultural Tour",
                            "Adventure Tour",
                            "Food Tour",
                        ]}
                    />
                </div>

                {/* Textarea */}
                <div className="mt-2 sm:mt-4">
                    <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#4A3728]">
                        Special Requests
                    </label>

                    <textarea
                        rows="2"
                        name="requests"
                        value={formData.requests}
                        onChange={handleChange}
                        placeholder="Tell us anything you'd like to add..."
                        className="w-full resize-none rounded-xl border border-[#D8C3A5] bg-white/20 px-3 sm:px-4 py-2 sm:py-3 text-sm text-[#4A3728] backdrop-blur-md outline-none transition-all duration-300 placeholder:text-xs sm:placeholder:text-gray-600 focus:border-[#B8860B] focus:bg-white/30"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading || !!successMessage}
                    className={`mt-4 sm:mt-6 w-full rounded-xl py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                        successMessage
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-linear-to-r from-[#C79A2D] to-[#8B5E3C] hover:shadow-xl sm:hover:-translate-y-1 sm:hover:scale-[1.02]"
                    }`}
                >
                    {loading && <FaSpinner className="animate-spin" size={16} />}
                    <span>
                        {loading
                            ? "Sending..."
                            : successMessage
                            ? "Submitted ✓"
                            : "Submit Request →"}
                    </span>
                </button>

                {successMessage && (
                    <p className="mt-2 sm:mt-3 rounded-lg bg-green-100 py-2 sm:py-3 px-3 text-center text-xs sm:text-sm font-medium text-green-700">
                        {successMessage}
                    </p>
                )}

                <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm text-[#5C4B3B]">
                    We will contact you within 24 hours.
                </p>

            </form>
        </div>
    );
}

export default BookingForm;