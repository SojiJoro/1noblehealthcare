import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="1noblehealthcare logo" className="h-10 mr-4" />
          <span className="font-bold text-xl">1noblehealthcare</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <a>Services</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
