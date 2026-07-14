import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-7xl font-bold">404</h1>

            <p className="mt-4 text-xl">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-8 rounded-lg bg-[#8B5E3C] px-6 py-3 text-white"
            >
                Back Home
            </Link>
        </div>
    );
}

export default NotFound;