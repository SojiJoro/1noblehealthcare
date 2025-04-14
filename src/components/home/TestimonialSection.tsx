// src/components/home/TestimonialSection.tsx
"use client";

export default function TestimonialSection() {
  return (
    <section className="py-12 px-4 bg-brandOrange bg-opacity-10 text-center">
      <h3 className="text-2xl lg:text-3xl font-bold mb-6">What Our Customers Say</h3>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg italic text-gray-700">
          &quot;1 Noble Healthcare has transformed our lives with their attentive,
          professional, and compassionate care.&quot;
        </p>
        <p className="mt-4 text-gray-500">– A Grateful Family</p>
      </div>
    </section>
  );
}
