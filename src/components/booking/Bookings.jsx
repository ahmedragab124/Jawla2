import { Link } from "react-router-dom";

function Bookings({ bookings, setBookings }) {

    const deleteBooking = (index) => {
        const updatedBookings = bookings.filter(
            (_, i) => i !== index
        );

        setBookings(updatedBookings);

        localStorage.setItem(
            "bookings",
            JSON.stringify(updatedBookings)
        );
    };

    return (
        <section className="min-h-screen bg-[#f8f5f2] p-4 sm:p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <h1 className="text-3xl sm:text-5xl font-bold text-[#8B5E3C] text-center sm:text-left">
                        Booking Requests <span className="text-xl sm:text-2xl font-normal text-gray-500">({bookings.length})</span>
                    </h1>

                    <Link
                        to="/"
                        className="rounded-xl bg-[#8B5E3C] px-6 py-3 text-white text-center transition hover:bg-[#6d462b]"
                    >
                        ← Back Home
                    </Link>

                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-500">
                            No Bookings Yet
                        </h2>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-2xl bg-white shadow-xl">
                            <table className="w-full">
                                <thead className="bg-[#8B5E3C] text-white">
                                    <tr>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">People</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Tour</th>
                                        <th className="p-4">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr
                                            key={index}
                                            className="border-b text-center hover:bg-gray-50"
                                        >
                                            <td className="p-4">{booking.fullName}</td>
                                            <td className="p-4">{booking.phone}</td>
                                            <td className="p-4">{booking.email}</td>
                                            <td className="p-4">{booking.people}</td>
                                            <td className="p-4">{booking.date}</td>
                                            <td className="p-4">{booking.tourType}</td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => deleteBooking(index)}
                                                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {bookings.map((booking, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl bg-white p-5 shadow-md border border-gray-100 flex flex-col gap-3"
                                >
                                    <div className="flex justify-between items-start border-b pb-2 border-gray-100">
                                        <div>
                                            <h3 className="font-bold text-lg text-[#8B5E3C]">
                                                {booking.fullName}
                                            </h3>
                                            <p className="text-xs text-gray-500">{booking.email}</p>
                                        </div>
                                        <span className="rounded-full bg-[#8B5E3C]/10 px-3 py-1 text-xs font-semibold text-[#8B5E3C]">
                                            {booking.tourType}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm text-[#5C4B3B]">
                                        <div>
                                            <span className="block text-xs text-gray-400 font-medium">
                                                Phone
                                            </span>
                                            <span className="font-medium">{booking.phone}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-400 font-medium">
                                                Preferred Date
                                            </span>
                                            <span className="font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-400 font-medium">
                                                Guests count
                                            </span>
                                            <span className="font-medium">
                                                {booking.people || 1} guest{Number(booking.people) > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                    </div>

                                    {booking.requests && (
                                        <div className="mt-1 bg-gray-50 p-2.5 rounded-lg text-xs text-[#5C4B3B]">
                                            <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                                                Special Requests
                                            </span>
                                            <p className="italic">"{booking.requests}"</p>
                                        </div>
                                    )}

                                    <div className="mt-2 pt-3 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={() => deleteBooking(index)}
                                            className="w-full sm:w-auto rounded-xl bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
                                        >
                                            Delete Request
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>

        </section>
    );
}

export default Bookings;
