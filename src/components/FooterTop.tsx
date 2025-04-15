"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default function FooterTop(): JSX.Element {
  return (
    <div className="footer-top">
      <div className="container">
        <div className="row g-5">
          {/* Logo */}
          <div className="col-md-3 d-flex align-items-start">
            <div className="footer-logo-box">
              <Image
                src="/images/logo.png"
                alt="1 Noble Healthcare Logo"
                width={100}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3 text-accent-yellow">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-white">Home</Link></li>
              <li><Link href="/who-we-are" className="text-white">Who We Are</Link></li>
              <li><Link href="/what-we-do" className="text-white">What We Do</Link></li>
              <li><Link href="/how-you-can-help" className="text-white">How You Can Help</Link></li>
              <li><Link href="/careers" className="text-white">Careers</Link></li>
              <li><Link href="/contact-us" className="text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* What We Do */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3 text-accent-yellow">What We Do</h5>
            <ul className="list-unstyled">
              <li><Link href="/services/adult-social-care" className="text-white">Adult Social Care</Link></li>
              <li><Link href="/services/supported-living" className="text-white">Supported Living</Link></li>
              <li><Link href="/services/educational-vocational-support" className="text-white">Educational & Vocational Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3 text-accent-yellow">Get in Touch</h5>
            <p className="mb-1 text-white">Ground Floor, Building 1000</p>
            <p className="mb-1 text-white">Western Road, Portsmouth</p>
            <p className="mb-1 text-white">Hampshire</p>
            <p className="mb-1 text-white">PO6 3EZ</p>
            <p className="mb-1 text-white">
              Email:{" "}
              <Link href="mailto:info@1noblehealthcare.com" className="text-white">
                info@1noblehealthcare.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
