"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Section Components
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactCtaSection from "@/components/home/ContactCtaSection";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialSection />
      <ContactCtaSection />
    </main>
  );
}
