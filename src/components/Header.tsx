// src/components/Header.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-brandBlue text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center">
          {/* Adjust the src to your actual logo file. */}
          <Image
            src="/images/yourLogo.png"
            alt="1 Noble Healthcare"
            width={50}
            height={50}
          />
          <span className="font-bold text-xl ml-3">1 Noble Healthcare</span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
