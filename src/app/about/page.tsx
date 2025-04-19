"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="py-16 px-6 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-brandBlue mb-6">
            Who We Are
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At 1 Noble Healthcare, we are committed to delivering exceptional healthcare services with compassion, innovation, and excellence. Our mission is to transform lives by providing person-centered care that empowers individuals and communities.
          </p>
        </div>

        {/* About Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-[#20BFA0] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              Our mission is to provide high-quality, person-centered healthcare services that empower individuals to live fulfilling lives. We strive to create a supportive environment where dignity, respect, and compassion are at the forefront of everything we do.
            </p>
            <h2 className="text-3xl font-bold text-[#20BFA0] mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              We envision a world where everyone has access to exceptional healthcare services that promote independence, well-being, and a sense of belonging. Through innovation and collaboration, we aim to set new standards in healthcare delivery.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="staffing-image-box">
              <Image
                src="/images/about-us.jpg"
                alt="About 1 Noble Healthcare"
                width={400}
                height={400}
                className="w-full h-full object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-[#20BFA0] mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compassion
              </h3>
              <p className="text-gray-600">
                We lead with empathy and treat every individual with dignity and respect.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600">
                We are committed to delivering the highest standards of care and professionalism.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace new ideas and technologies to improve the lives of those we serve.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We work together with individuals, families, and communities to achieve shared goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
