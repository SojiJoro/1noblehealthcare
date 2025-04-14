// src/app/page.tsx
export default function HomePage() {
    return (
      <div className="text-center my-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to 1noblehealthcare</h1>
        <p className="text-lg mb-6">
          We provide high-quality healthcare solutions with compassion and innovation.
        </p>
        <a href="/about" className="bg-secondary text-white py-3 px-6 rounded hover:opacity-90 transition">
          Learn More About Us
        </a>
      </div>
    )
  }
  