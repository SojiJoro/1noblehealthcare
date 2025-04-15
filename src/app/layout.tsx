// src/app/layout.tsx
import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "@/components/Navbar";
import FooterTop from "@/components/FooterTop";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "1 Noble Healthcare",
  description: "Delivering exceptional healthcare services with compassion and innovation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          {/* Navbar */}
          <Navbar />
          {/* Main Content */}
          <main className="content">{children}</main>
          {/* Footer Sections */}
          <FooterTop />
          <Footer />
        </div>
      </body>
    </html>
  );
}
