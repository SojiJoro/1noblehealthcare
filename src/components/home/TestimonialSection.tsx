"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Angela Thompson",
      role: "Support Worker",
      quote: "Joining 1 Noble Healthcare changed my perspective on care work. I feel truly valued and supported every day.",
      image: "/images/testimonial1.jpg",
    },
    {
      name: "David Akinwale",
      role: "Son of a Service User",
      quote: "The difference in my dad's wellbeing since we found 1 Noble is incredible. Their team treats him like family.",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Chinelo Eze",
      role: "Registered Nurse",
      quote: "It's not just a job here – it's a place where people genuinely care about the lives they touch. I'm proud to be part of the team.",
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
