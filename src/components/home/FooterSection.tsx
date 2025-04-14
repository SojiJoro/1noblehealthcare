// src/components/home/FooterSection.tsx
"use client";

import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-brandBlue text-white py-8 px-4 lg:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">1 Noble Healthcare</h4>
          <p className="text-sm mb-4">
            Committed to delivering innovative, compassionate healthcare solutions 
            for every individual.
          </p>
          <Link href="/contact" className="bg-brandGreen text-white py-2 px-4 rounded inline-block">
            Contact Us
          </Link>
        </div>

        <div>
          <h5 className="font-semibold text-lg mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-lg mb-3">Get In Touch</h5>
          <p className="text-sm mb-2">Email: info@1noblehealthcare.com</p>
          <p className="text-sm mb-4">Phone: +1234 567 890</p>
          {/* Social icons placeholders */}
          <div className="flex space-x-4">
            <Link href="#">
              <svg className="w-5 h-5 fill-white hover:fill-brandGreen transition" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.48-10 10 0 4.41 2.99 8.14 7 9.48v-6.7h-2.1v-2.78h2.1v-2.12c0-2.07 1.25-3.22 3.16-3.22.91 0 1.87.17 1.87.17v2.06h-1.06c-1.05 0-1.38.65-1.38 1.32v1.59h2.35l-.38 2.78h-1.97V22c4.01-1.34 7-5.07 7-9.48 0-5.52-4.5-10-10-10z" />
              </svg>
            </Link>
            <Link href="#">
              <svg className="w-5 h-5 fill-white hover:fill-brandGreen transition" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.29 4.29 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.8a4.28 4.28 0 001.32 5.7 4.23 4.23 0 01-1.94-.54v.06a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.98A8.59 8.59 0 012 19.53a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.73 8.73 0 0024 4.56a8.52 8.52 0 01-2.54.7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-xs mt-8 text-gray-300 border-t border-gray-500 pt-4">
        &copy; {new Date().getFullYear()} 1 Noble Healthcare. All rights reserved.
      </div>
    </footer>
  );
}
