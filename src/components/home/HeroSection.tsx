"use client";

import Image from "next/image";
import Link from "next/link";
import WaveDivider from "./WaveDivider";

export default function HeroSection() {
  return (
    <section className="relative bg-brandBlue text-white pt-16 pb-20 px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      {/* Left Content */}
      <div className="max-w-xl mb-8 lg:mb-0">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          1 Noble Healthcare: Where Compassion Meets Excellence.
        </h1>
        <p className="mb-6 text-lg">
          Our dedicated team brings innovative care solutions, ensuring every patient
          receives the highest quality support.
        </p>
        <Link
          href="/services"
          className="inline-block bg-brandGreen hover:bg-[#66aa1b] text-white font-semibold py-3 px-6 rounded shadow transition"
        >
          Explore Our Services
        </Link>
      </div>

      {/* Right Image */}
      <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative h-72 w-72 lg:h-[400px] lg:w-[400px]">
          <Image
            src="/images/nurse.png"
            alt="Healthcare Professional"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Wave Divider at the bottom of the hero */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider color="#ffffff" />
      </div>
    </section>
  );
}
