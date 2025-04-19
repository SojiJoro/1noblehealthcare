"use client";

import { useState } from "react";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cv: null,
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("message", formData.message);
    if (formData.cv) body.append("cv", formData.cv);

    const res = await fetch("/api/apply", {
      method: "POST",
      body,
    });

    const data = await res.json();
    alert(data.message);
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
        <button type="submit" className="btn btn-success">
          Submit Application
        </button>
      </form>
    </div>
  );
}
