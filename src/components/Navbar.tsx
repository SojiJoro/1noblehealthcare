"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/yourLogo.png"
                alt="1 Noble Healthcare Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-bold text-brandBlue">
                1 Noble Healthcare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brandBlue transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brandBlue transition">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-brandBlue transition">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brandBlue transition">
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-brandBlue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brandBlue"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-brandBlue transition px-3 py-2 rounded-md">
              Home
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-brandBlue transition px-3 py-2 rounded-md">
              About
            </Link>
            <Link href="/services" className="block text-gray-700 hover:text-brandBlue transition px-3 py-2 rounded-md">
              Services
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-brandBlue transition px-3 py-2 rounded-md">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
