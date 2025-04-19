export default function ThankYouPage() {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Thank You!</h1>
          <p className="text-lg mb-2">
            Your application has been submitted successfully.
          </p>
          <p className="text-gray-600 mb-6">
            We’ll review your submission and contact you if you're shortlisted.
          </p>
          <a
            href="/"
            className="bg-brandBlue text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#008FCC] transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }
  