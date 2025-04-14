export default function Home() {
    return (
      <div>
        <section className="text-center my-8">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to 1noblehealthcare
          </h1>
          <p className="text-lg mb-6">
            We offer high-quality healthcare solutions with a blend of innovation and empathy.
          </p>
          <a href="/about" className="bg-secondary text-white py-3 px-6 rounded hover:bg-green-700 transition">
            Learn More About Us
          </a>
        </section>
  
        <section className="my-8">
          <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
          <p className="mb-4">
            We specialise in primary care, specialist consultations, telemedicine, and emergency services.
          </p>
        </section>
      </div>
    )
  }
  