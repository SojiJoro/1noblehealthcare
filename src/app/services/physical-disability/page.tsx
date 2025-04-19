"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PhysicalDisabilityPage() {
  const features = [
    "Mobility & Equipment Support",
    "Daily Living Assistance",
    "Personal Care & Hygiene",
    "Home Adaptation Guidance",
    "Coordination with Therapists",
    "Flexible, Respectful Support"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Physical Disability Services</h1>
          <p className="staffing-description">
            Our care promotes independence, dignity, and comfort for individuals living with
            physical disabilities. We offer responsive, respectful support that adapts to
            evolving needs.
          </p>
          <p className="staffing-description">
            From personal care and assistance with mobility to specialist referrals and home
            adaptations, our team delivers practical and empowering care that puts you in
            control.
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
            Contact Us
          </Link>
        </div>

        {/* Image Column */}
        <div className="staffing-image">
          <div className="staffing-image-box">
            <Image
              src="/images/physical-disability.jpg"
              alt="Physical Disability Services"
              width={400}
              height={400}
              className="w-full h-full object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
