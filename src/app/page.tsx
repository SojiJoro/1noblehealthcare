"use client";

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import FooterSection from "@/components/home/FooterSection";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}
