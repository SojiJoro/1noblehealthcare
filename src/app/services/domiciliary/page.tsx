"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function DomiciliaryPage() {
  const features = [
    "Daily Personal Assistance",
    "Meal Prep & Medication Support",
    "Companionship & Emotional Support",
    "Flexible Scheduling",
    "Safe Home Environment",
    "Independence in Familiar Spaces"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Domiciliary Care</h1>
          <p className="staffing-description">
            Our domiciliary care services bring compassionate support directly to your home.
            Whether it’s help with daily routines or ongoing wellbeing support, we aim to
            preserve independence and dignity in the comfort of your own surroundings.
          </p>
          <p className="staffing-description">
            We work closely with individuals and their families to create a personalised care
            plan that fits around routines, preferences, and evolving needs—so you always feel
            supported and in control.
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
              src="/images/domiciliary.jpg"
              alt="Domiciliary Care"
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