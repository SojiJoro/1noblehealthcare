"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Caregiver",
      quote: "1 Noble Healthcare has been a game-changer. The support and professionalism I received were outstanding!",
      image: "/images/testimonial1.jpg",
    },
    {
      name: "John Smith",
      role: "Client Family Member",
      quote: "The care my mother received was nothing short of exceptional. I recommend them wholeheartedly.",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Nina Okoro",
      role: "Nurse",
      quote: "They value their staff and clients equally. Working with 1 Noble Healthcare has been fulfilling.",
      image: "/images/testimonial3.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[current];

  return (
    <section className="testimonial-section" id="testimonials">
      <h3 className="testimonial-heading">What Our Clients Say</h3>

      <div className="testimonial-container">
        <div className="testimonial-card" data-aos="fade-up">
          <div className="testimonial-img-wrapper">
            <Image src={active.image} alt={active.name} fill className="testimonial-img" />
          </div>
          <blockquote className="testimonial-quote">“{active.quote}”</blockquote>
          <div className="testimonial-author">
            <p className="testimonial-name">{active.name}</p>
            <p className="testimonial-role">{active.role}</p>
          </div>
        </div>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
