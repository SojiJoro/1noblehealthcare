"use client";

import Link from "next/link"; // ✅ this is the fix

export default function Footer() {
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="footer-divider"></div>
        <span>© 2025 1 Noble Healthcare | Follow us: </span>
        <Link href="#"><i className="fab fa-facebook"></i></Link>
        <Link href="#"><i className="fab fa-twitter"></i></Link>
        <Link href="#"><i className="fab fa-instagram"></i></Link>
      </div>
    </div>
  );
}
