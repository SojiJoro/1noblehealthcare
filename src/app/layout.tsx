// src/app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/app/globals.css";

import MainNavbar from "../components/MainNavbar";
import FooterTop from "../components/FooterTop";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "1 Noble Healthcare",
  description:
    "Delivering exceptional healthcare services with compassion and innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="page-container">
          <MainNavbar />
          <main className="content">{children}</main>
          <FooterTop />
          <Footer />
        </div>
      </body>
    </html>
  );
}