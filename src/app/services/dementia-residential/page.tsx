"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function DementiaResidentialPage() {
  const features = [
    "Secure, Calm Environments",
    "Familiar Daily Routines",
    "Trained Dementia Care Staff",
    "24/7 Supervision",
    "Memory & Sensory Activities",
    "Family Involvement & Support"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Dementia Residential Services</h1>
          <p className="staffing-description">
            Our dementia care homes offer a warm, consistent environment built around
            comfort, familiarity, and trust. We support every resident with compassion
            and dignity—helping them feel safe, respected, and at ease.
          </p>
          <p className="staffing-description">
            Our trained dementia professionals tailor care to each individual’s needs and
            history. We focus on maintaining routines, reducing anxiety, and supporting
            families with open communication.
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
              src="/images/dementia-residential.jpg"
              alt="Dementia Residential Services"
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
