"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  const allServices = [
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
    {
      title: "Supported Living",
      href: "/services/supported-living",
      image: "/images/supported-living.jpg",
    },
    {
      title: "Domiciliary Care",
      href: "/services/domiciliary",
      image: "/images/domiciliary.jpg",
    },
    {
      title: "Staffing Solutions",
      href: "/services/staffing",
      image: "/images/staffing.jpg",
    },
    {
      title: "Young Adults Support",
      href: "/services/young-adults",
      image: "/images/young-adults.jpg",
    },
  ];

  const homepageServices = allServices.slice(0, 3); // Only show first 3

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Text section */}
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

        {/* Image grid for homepage preview */}
        <div className="services-grid-wrapper">
          <div className="services-grid">
            {homepageServices.map((service, index) => (
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
