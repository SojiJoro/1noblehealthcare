// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-brandBlue text-white py-16 px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Left text */}
        <div className="max-w-xl mb-8 lg:mb-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Your all-round care provider, touching lives from the first impression.
          </h1>
          <p className="mb-6 text-lg">
            Our committed, highly trained professionals are dedicated to making healthcare more
            efficient, caring, and effective.
          </p>
          <Link
            href="/services"
            className="inline-block bg-brandGreen hover:opacity-90 text-white py-3 px-6 rounded font-semibold transition"
          >
            Explore Our Services
          </Link>
        </div>

        {/* Right image (placeholder) */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative h-80 w-80 lg:h-[400px] lg:w-[400px]">
            {/* Replace nurse.png with your brand image */}
            <Image
              src="/images/nurse.png"
              alt="Nurse"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* IMPRESSION CARE SOLUTIONS SECTION */}
      <section className="py-12 px-4 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Impression Care Solutions
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-8">
          We employ a compassionate approach to fulfilling care needs across various settings.
        </p>
        <div className="max-w-5xl mx-auto text-left text-gray-600">
          <p className="mb-4">
            Our solutions integrate modern healthcare practices with a personal touch, ensuring
            every patient receives the highest quality of care. We partner with families, communities,
            and medical facilities to deliver customised care solutions.
          </p>
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="bg-white py-10 px-4 lg:px-8">
        <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">Our Key Services</h3>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="border p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Staffing Solutions</h4>
            <p className="text-gray-600">
              Providing top-notch medical professionals for hospitals, clinics, and home care.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 2 */}
          <div className="border p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Supported Living</h4>
            <p className="text-gray-600">
              Offering care in a comfortable setting, ensuring independence and dignity.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 3 */}
          <div className="border p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Domiciliary Care</h4>
            <p className="text-gray-600">
              Bringing essential care services directly to your home for convenience and reassurance.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>

          {/* Card 4 */}
          <div className="border p-6 rounded-md shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Children & Young Adults</h4>
            <p className="text-gray-600">
              Specialised programs to ensure high-quality care for younger age groups.
            </p>
            <Link href="/services" className="text-brandBlue font-semibold mt-4 inline-block">
              Read more
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-12 px-4 bg-[#F9FAFB] text-center">
        <h3 className="text-2xl lg:text-3xl font-bold mb-6">What Our Customers Say</h3>
        <div className="max-w-4xl mx-auto">
        <p>
  &quot;The staff at 1 Noble Healthcare are attentive, professional, and compassionate.
  They made a tremendous difference in our family&apos;s life!&quot;
</p>

          <p className="mt-4 text-gray-500">– A Satisfied Client</p>
        </div>
      </section>

      {/* FOOTER-LIKE LARGE BLUE SECTION */}
      <footer className="bg-brandBlue text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-xl font-bold mb-4">Send Your Inquiries</h4>
          <p className="text-gray-200 mb-6">
            Discover specialised support tailored to your needs. Reach out to us today.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div>
              <h5 className="font-semibold mb-2">Impression Healthcare</h5>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Resources</h5>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>Blog</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Contact Us</h5>
              <p className="text-sm text-gray-200">
                Email: info@1noblehealthcare.com<br />
                Phone: +1234 567 890
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-8 text-gray-400 border-t border-gray-500 pt-4">
          &copy; {new Date().getFullYear()} 1 Noble Healthcare. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
