"use client";

import Image from "next/image";
import Link from "next/link";

export default function SupportedLivingPage() {
  return (
    <section className="bg-white py-16 px-4 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Text content */}
        <div className="lg:w-1/2" data-aos="fade-right">
          <h1 className="text-4xl font-bold text-brandBlue mb-4">
            Supported Living
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our supported living services promote independence, dignity, and community integration. We tailor care plans that empower individuals with complex needs to lead fulfilling lives in safe, comfortable environments.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brandGreen text-white py-3 px-6 rounded shadow hover:bg-[#66aa1b] transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 relative h-[300px] lg:h-[400px]" data-aos="fade-left">
          <Image
            src="/images/supported-living.jpg"
            alt="Supported Living"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
