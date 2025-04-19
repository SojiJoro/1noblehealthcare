"use client";

import Link from "next/link";

export default function ContactCtaSection() {
  return (
    <section className="contact-cta-section">
      <div className="contact-cta-container" data-aos="fade-up">
        <h3 className="contact-cta-heading">
          Let's Build a Healthier Community Together
        </h3>
        <p className="contact-cta-subheading">
          Whether you're a healthcare professional seeking a rewarding career, or a facility in need of dedicated staff, 1 Noble Healthcare is here to help.
        </p>

        <div className="contact-cta-buttons">
          <Link href="/careers" className="contact-cta-btn join">
            Join Our Team
          </Link>
          <Link href="/contact-us" className="contact-cta-btn request">
            Request Staff
          </Link>
        </div>
      </div>
    </section>
  );
}
