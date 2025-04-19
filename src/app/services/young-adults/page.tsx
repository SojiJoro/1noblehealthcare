"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function YoungAdultsPage() {
  const features = [
    "Care for Ages 5 to 25",
    "Autism & ADHD Support",
    "Educational & Social Development",
    "Family & School Collaboration",
    "Flexible Respite & Long-Term Care",
    "Safe, Inclusive Environments"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Children & Young Adults</h1>
          <p className="staffing-description">
            We provide tailored care and developmental support for children and young adults
            navigating physical, emotional, or neurodiverse challenges. Our services focus on
            building confidence, communication, and independence.
          </p>
          <p className="staffing-description">
            From daily routines and behaviour management to school transition and social
            engagement, we work closely with families to deliver compassionate, age-appropriate care.
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
              src="/images/young-adults.jpg"
              alt="Children & Young Adults"
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
