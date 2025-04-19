"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function StaffingPage() {
  const features = [
    "Qualified Professionals",
    "Flexible Shifts & Rotas",
    "24/7 Availability",
    "Vetted & DBS Checked",
    "Care-Centred Ethos",
    "Fast Turnaround",
  ];

  return (
    <main className="bg-white">
      {/* Intro Section */}
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Staffing Solutions You Can Rely On</h1>
          <p className="staffing-description">
            At <strong>1 Noble Healthcare</strong>, we supply trained, dependable healthcare staff
            ready to serve hospitals, residential care settings, and private clients. From urgent
            requests to long-term placement, we ensure compassionate, person-centred care.
          </p>

          <div className="staffing-features">
            {features.map((feature, index) => (
              <div key={index} className="staffing-feature">
                <Check />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/contact-us" className="staffing-cta">
            Request Staff
          </Link>
        </div>

        {/* Image Column */}
        <div className="staffing-image-box square-image">
  <Image
    src="/images/staffing.jpg"
    alt="Healthcare Staffing"
    width={400}
    height={400}
    className="object-contain w-full h-full rounded-lg shadow-md"
    priority
  />
</div>

      </section>
    </main>
  );
}
