"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "Learning Disability Services",
      href: "/services/learning-disability",
      image: "/images/learning-disability.jpg",
    },
    {
      title: "Physical Disability Services",
      href: "/services/physical-disability",
      image: "/images/physical-disability.jpg",
    },
    {
      title: "Dementia Residential Services",
      href: "/services/dementia-residential",
      image: "/images/dementia-residential.jpg",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Text column */}
        <div className="services-text">
          <h2>Our Services</h2>
          <p>
            At <strong>1 Noble Healthcare</strong>, we provide personalised care services that
            enhance lives and foster independence.
          </p>
          <p>
            Whether in supported living, residential settings or at home, our experienced team
            ensures compassionate, person-centred support.
          </p>
          <Link href="/services" className="services-button">
            View All Services →
          </Link>
        </div>

        {/* Image grid */}
        <div className="services-grid-wrapper">
          <div className="services-grid">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="service-card">
                <div className="service-img-container">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={250}
                    className="service-img"
                  />
                </div>
                <div className="service-title">{service.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
