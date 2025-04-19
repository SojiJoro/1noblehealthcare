// src/components/MainNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav
      id="mainNav"
      className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center no-underline">
          <img
            src="/images/logo.png"
            alt="1 Noble Healthcare Logo"
            width={100}
            height={60}
            className="mr-3"
          />
        </Link>

        {/* Navigation Tabs */}
        <div className="flex space-x-6">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  no-underline
                  px-3 py-1 font-medium transition-colors duration-300
                  ${isActive
                    ? "text-blue-600"
                    : "text-[#257264] hover:text-gray-700 hover:no-underline"}
                `}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
