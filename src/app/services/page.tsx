"use client";

import Image from "next/image";
import Link from "next/link";

export default function AllServicesPage() {
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

  return (
    <section className="services-section" id="all-services">
      <div className="services-container">
        {/* Header section */}
        <div className="services-text">
          <h2>All Our Services</h2>
          <p>
            Discover the full range of care services we offer. Each one is designed
            to meet the unique needs of the individuals and families we support —
            always with compassion, dignity, and a person-centred approach.
          </p>
        </div>

        {/* Full services grid */}
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
