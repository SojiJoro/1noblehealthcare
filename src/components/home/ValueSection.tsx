// src/components/home/ValueSection.tsx
"use client";

import { FaHeart, FaUsers, FaHandHoldingMedical, FaThumbsUp } from "react-icons/fa";

export default function ValueSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 lg:px-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-[#20BFA0]">
          Why Choose Us
        </h3>
        <p className="mt-2 max-w-2xl mx-auto text-gray-700">
          We go beyond healthcare delivery. Here’s what sets us apart.
        </p>
      </div>

      {/* Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          data-aos="fade-up"
        >
          <div className="text-[#20BFA0] text-5xl mb-6">
            <FaHeart />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Compassionate Care
          </h4>
          <p className="text-gray-600 text-sm">
            We treat every individual with empathy, respect, and dignity.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="text-[#F15A24] text-5xl mb-6">
            <FaUsers />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Expert Team
          </h4>
          <p className="text-gray-600 text-sm">
            Highly trained professionals delivering excellent support.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="text-[#00ADEF] text-5xl mb-6">
            <FaHandHoldingMedical />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Integrated Support
          </h4>
          <p className="text-gray-600 text-sm">
            We work with families, agencies, and communities.
          </p>
        </div>

        {/* Card 4 */}
        <div
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-[#ED1C24] text-5xl mb-6">
            <FaThumbsUp />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Trusted Provider
          </h4>
          <p className="text-gray-600 text-sm">
            Years of experience supporting vulnerable individuals.
          </p>
        </div>
      </div>
    </section>
  );
}
