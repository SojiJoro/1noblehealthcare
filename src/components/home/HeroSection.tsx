"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <header className="hero">
      <div className="overlay"></div>
      <div className="hero-content text-center">
        <h1>Professional & Person-Centered Care</h1>
        <h2>We are your trusted partner in social care, delivering high-quality support.</h2>
        <Link
          href="/about" // Updated to lead to the About page
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#20bfa0",
            borderColor: "#164B68",
            color: "#fff",
          }}
        >
          Learn More
        </Link>
      </div>
    </header>
  );
}
