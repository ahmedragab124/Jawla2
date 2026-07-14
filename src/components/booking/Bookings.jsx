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
        <section className="min-h-screen bg-[#f8f5f2] p-8">

            <div className="mb-8 flex justify-between">

                <h1 className="text-5xl font-bold text-[#8B5E3C]">
                    Booking Requests
                </h1>

                <Link
                    to="/"
                    className="rounded-xl bg-[#8B5E3C] px-6 py-3 text-white transition hover:bg-[#6d462b]"
                >
                    ← Back Home
                </Link>

            </div>

            <div className="mx-auto max-w-7xl">

                <h1 className="mb-2 text-center text-5xl font-bold text-[#8B5E3C]">
                    Booking Requests
                </h1>

                <p className="mb-8 text-center text-gray-600">
                    Total Bookings : {bookings.length}
                </p>

                {bookings.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-500">
                            No Bookings Yet
                        </h2>
                    </div>
                ) : (

                    <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">

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

                                        <td className="p-4">
                                            {booking.fullName}
                                        </td>

                                        <td className="p-4">
                                            {booking.phone}
                                        </td>

                                        <td className="p-4">
                                            {booking.email}
                                        </td>

                                        <td className="p-4">
                                            {booking.people}
                                        </td>

                                        <td className="p-4">
                                            {booking.date}
                                        </td>

                                        <td className="p-4">
                                            {booking.tourType}
                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() =>
                                                    deleteBooking(index)
                                                }
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

                )}

            </div>

        </section>
    );
}

export default Bookings;
