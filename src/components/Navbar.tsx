"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
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
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="1 Noble Healthcare Logo"
            width={100}
            height={60}
            className="mr-3"
            priority
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
                className={`px-3 py-1 border-b-2 transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600 border-blue-500"
                    : "text-[#257264] border-transparent hover:border-gray-400"
                }`}
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
