// src/components/home/ServicesSection.tsx
"use client";

import Link from "next/link";
import WaveDivider from "./WaveDivider";

export default function ServicesSection() {
  return (
    <section className="relative bg-gray-50 pt-10 pb-12 px-4 lg:px-12">
      {/* Wave at the top, brandBlue color, reversed by flipping vertically */}
      <div className="absolute top-0 left-0 right-0 rotate-180">
        <WaveDivider color="#ffffff" />
      </div>

      <div className="relative pt-20">
        <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
          Our Key Services
        </h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="border p-6 rounded-md shadow-sm hover:shadow-lg transition duration-200 bg-white">
            <h4 className="text-xl font-semibold mb-2">Staffing Solutions</h4>
            <p className="text-gray-600">
              Supplying highly qualified healthcare professionals for hospitals, clinics, and home care.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 2 */}
          <div className="border p-6 rounded-md shadow-sm hover:shadow-lg transition duration-200 bg-white">
            <h4 className="text-xl font-semibold mb-2">Supported Living</h4>
            <p className="text-gray-600">
              Providing supportive living environments that promote independence and dignity.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 3 */}
          <div className="border p-6 rounded-md shadow-sm hover:shadow-lg transition duration-200 bg-white">
            <h4 className="text-xl font-semibold mb-2">Domiciliary Care</h4>
            <p className="text-gray-600">
              Delivering essential care services directly to your home for convenience and peace of mind.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 4 */}
          <div className="border p-6 rounded-md shadow-sm hover:shadow-lg transition duration-200 bg-white">
            <h4 className="text-xl font-semibold mb-2">Pediatric & Adolescent Care</h4>
            <p className="text-gray-600">
              Specialized care for infants, children, and young adults, ensuring comprehensive support.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
