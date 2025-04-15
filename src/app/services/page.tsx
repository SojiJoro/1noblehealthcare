// src/app/services/page.tsx
"use client";

export default function ServicesPage() {
  const services = [
    {
      title: "Staffing Solutions",
      desc: "Supplying healthcare professionals to hospitals, clinics, and homes.",
    },
    {
      title: "Supported Living",
      desc: "Promoting independence and dignity through tailored support.",
    },
    {
      title: "Domiciliary Care",
      desc: "Personalised care services delivered to your home.",
    },
    {
      title: "Pediatric & Adolescent Care",
      desc: "Specialised care for children and young people.",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-brandBlue text-center mb-12">
          Our Services
        </h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
