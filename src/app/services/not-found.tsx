"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-brandBlue mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist. It might have been moved,
          renamed, or deleted. Please check the URL or return to the homepage.
        </p>
        <Link
          href="/"
          className="bg-brandBlue text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#008FCC] transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </section>
  );
}
