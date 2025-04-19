"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const vacanciesData = [
    {
      id: 1,
      title: "Support Worker",
      location: "Bournemouth",
      description:
        "Join our Bournemouth team to support adults with autism in a home-style environment. You'll help individuals build confidence, develop skills, and live more independently each day.",
    },
    {
      id: 2,
      title: "Support Worker",
      location: "Fareham",
      description:
        "We're looking for a compassionate support worker in Fareham to assist adults with autism in their daily routines, promote independence, and offer meaningful companionship and encouragement.",
    },
    {
      id: 3,
      title: "HCA",
      location: "Bournemouth",
      description:
        "As a Healthcare Assistant in Bournemouth, you’ll provide essential support to individuals in our residential service. Tasks range from personal care to helping with activities that bring joy and structure to their day.",
    },
    {
      id: 4,
      title: "HCA",
      location: "Fareham",
      description:
        "Based in Fareham, this HCA role involves working closely with people who need compassionate care and everyday support. Your role is key in ensuring their wellbeing, safety, and personal growth.",
    },
    {
      id: 5,
      title: "Care Assistant",
      location: "Bournemouth",
      description:
        "Support residents in Bournemouth by assisting with personal care, mobility, and day-to-day tasks. Your role helps ensure comfort and dignity for individuals in supported living.",
    },
    {
      id: 6,
      title: "Care Assistant",
      location: "Fareham",
      description:
        "Looking for a rewarding Care Assistant position in Fareham? You'll be part of a caring team, helping residents with daily living, emotional support, and companionship in a safe, structured environment.",
    },
  ];

  const filteredVacancies = vacanciesData.filter((vacancy) => {
    const search = searchTerm.toLowerCase();
    return (
      vacancy.title.toLowerCase().includes(search) ||
      vacancy.location.toLowerCase().includes(search)
    );
  });

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentVacancies = filteredVacancies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVacancies.length / jobsPerPage);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-3xl font-bold text-brandBlue">Careers at 1 Noble Healthcare</h1>
      <p className="mb-4">
        We're always looking for compassionate, professional individuals to join our team.
        Browse our current openings, search by role or location, and find where you fit in.
      </p>

      {/* Search input */}
      <div className="mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search by role or location..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <h4 className="mb-3">Available Roles</h4>

      {currentVacancies.length > 0 ? (
        <div className="row">
          {currentVacancies.map((vacancy) => (
            <div key={vacancy.id} className="col-md-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title font-semibold">{vacancy.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{vacancy.location}</h6>
                  <p className="card-text text-sm text-gray-600">{vacancy.description}</p>
                  <Link
                    href="/careers/apply"
                    className="inline-block mt-3 px-4 py-2 text-white bg-[#20bfa0] hover:bg-[#1aa78f] font-medium text-sm rounded-md shadow transition-all"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="alert alert-warning">No roles match your search at the moment.</p>
      )}

      {/* Custom Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 mx-1 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition ${currentPage === 1 && "cursor-not-allowed text-gray-400"}`}
            disabled={currentPage === 1}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </div>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 mx-1 rounded-md transition font-medium ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 mx-1 text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white transition ${currentPage === totalPages && "cursor-not-allowed text-gray-400"}`}
            disabled={currentPage === totalPages}
          >
            <div className="flex items-center">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
