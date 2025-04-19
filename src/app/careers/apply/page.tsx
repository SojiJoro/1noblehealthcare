"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cv: null,
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("message", formData.message);
    if (formData.cv) body.append("cv", formData.cv);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Application submitted successfully!");
        router.push("/thank-you");
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (err) {
      setStatus("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Job Application Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows={4}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload CV (PDF/DOC)</label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      {status && (
        <div className={`alert mt-3 ${status.startsWith("Error") ? "alert-danger" : "alert-info"}`}>
          {status}
        </div>
      )}
    </div>
  );
}
