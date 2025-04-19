"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function LearningDisabilityPage() {
  const features = [
    "Personalised Support Plans",
    "Daily Life & Skill Development",
    "Independence with Guidance",
    "Inclusive Community Activities",
    "Support in Living, Work & Social Settings",
    "Family & Carer Collaboration"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Learning Disability Services</h1>
          <p className="staffing-description">
            We support individuals with learning disabilities to lead empowered, fulfilling
            lives. Whether living independently or in supported environments, our care focuses
            on daily routines, practical skills, and boosting confidence.
          </p>
          <p className="staffing-description">
            Our approach is inclusive, compassionate, and collaborative—promoting social
            connection, positive behaviour, and lifelong personal development.
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
              src="/images/learning-disability.jpg"
              alt="Learning Disability Services"
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