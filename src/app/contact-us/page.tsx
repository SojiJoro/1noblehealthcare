"use client";

import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="fw-bold text-center mb-4">Get in Touch</h1>
      <p className="lead text-center mb-5">
        We’re here to help. Send us a message and we’ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label fw-bold">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Your Message</label>
          <textarea
            name="message"
            className="form-control"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "#20bfa0", // Footer color
            borderColor: "#20bfa0", // Footer color for border
            color: "#fff", // White text for contrast
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {responseMessage && (
        <div className="alert alert-info mt-4 text-center">{responseMessage}</div>
      )}
    </div>
  );
}
