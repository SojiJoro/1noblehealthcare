"use client";

import Image from "next/image";
import Link from "next/link";

export default function StaffingPage() {
  return (
    <section className="bg-white py-16 px-4 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-10">
        {/* Text content */}
        <div className="lg:w-1/2" data-aos="fade-left">
          <h1 className="text-4xl font-bold text-brandBlue mb-4">
            Staffing Solutions
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We provide highly trained, compassionate healthcare professionals ready to support hospitals, clinics, care homes, and individuals. Whether short-term cover or long-term placement, our staffing ensures continuity and excellence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brandGreen text-white py-3 px-6 rounded shadow hover:bg-[#66aa1b] transition"
          >
            Request Staff
          </Link>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 relative h-[300px] lg:h-[400px]" data-aos="fade-right">
          <Image
            src="/images/staffing.jpg"
            alt="Healthcare Staffing"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
