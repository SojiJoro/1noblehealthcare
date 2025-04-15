"use client";

import React, { useEffect } from "react";
import { FaUserMd, FaHeart, FaBrain, FaShieldAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const reasons = [
  {
    icon: <FaUserMd className="why-icon text-brandBlue" />,
    title: "Expert Professionals",
    desc: "Our staff are highly trained, experienced, and passionate about delivering quality care.",
  },
  {
    icon: <FaHeart className="why-icon text-brandRed" />,
    title: "Compassionate Approach",
    desc: "We lead with empathy and treat every individual with dignity and respect.",
  },
  {
    icon: <FaBrain className="why-icon text-brandGreen" />,
    title: "Innovative Care",
    desc: "We continuously adopt new methods to improve the well-being of those we support.",
  },
  {
    icon: <FaShieldAlt className="why-icon text-brandOrange" />,
    title: "Safety & Trust",
    desc: "We provide safe environments and build trusting relationships with our clients and families.",
  },
];

export default function WhyChooseUsSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="why-section">
      <h3 className="why-title">Why Choose 1 Noble Healthcare?</h3>
      <div className="why-grid">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="why-card"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            {reason.icon}
            <h4 className="why-card-title">{reason.title}</h4>
            <p className="why-card-desc">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
