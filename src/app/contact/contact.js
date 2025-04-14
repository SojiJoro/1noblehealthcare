export default function Contact() {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="mb-4">
          If you have any queries or need more information, please fill in the form below and we will
          get back to you shortly.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Your message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-accent text-white py-3 px-6 rounded hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    )
  }
  