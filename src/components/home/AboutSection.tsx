"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Left Text Column */}
        <div className="about-text">
  <h2>About 1 Noble Healthcare</h2>
  <p>
    At 1 Noble Healthcare, we believe that everyone deserves care that respects their individuality and supports their well-being. Our mission is to enhance lives by providing compassionate, person-centred services that empower individuals to live with dignity and independence.
  </p>
  <p>
    Our dedicated team offers tailored support across various settings, including supported living, domiciliary care, and health staffing. We work closely with individuals and organisations to deliver innovative healthcare solutions that meet unique needs and preferences.
  </p>
  <p>
    With a commitment to excellence, respect, and continuous improvement, 1 Noble Healthcare strives to make a positive impact in the communities we serve, ensuring that every person receives the highest standard of care.
  </p>
</div>


        {/* Right Image Column */}
        <div className="about-image">
          <Image
            src="/images/about-placeholder.jpg"
            alt="About 1 Noble Healthcare"
            width={600}
            height={400}
            className="img"
            priority
          />
        </div>
      </div>
    </section>
  );
}
