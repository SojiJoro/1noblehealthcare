"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SupportedLivingPage() {
  const features = [
    "Tailored Independence Plans",
    "24/7 On-Site or Visiting Support",
    "Support with Tenancy & Daily Life",
    "Person-Centred Care",
    "Focus on Choice & Control",
    "Community Access & Inclusion"
  ];

  return (
    <main className="bg-white">
      <section className="staffing-wrapper">
        {/* Text Column */}
        <div className="staffing-content">
          <h1 className="staffing-heading">Supported Living</h1>
          <p className="staffing-description">
            Our supported living services are designed to help individuals live as independently
            as possible while receiving the care and support they need to thrive. We work with
            people to build personalised plans tailored to their choices, strengths, and goals.
          </p>
          <p className="staffing-description">
            From maintaining a tenancy to managing personal care or accessing the community, we
            provide flexible support that promotes dignity, wellbeing, and control over daily life.
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
              src="/images/supported-living.jpg"
              alt="Supported Living"
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
