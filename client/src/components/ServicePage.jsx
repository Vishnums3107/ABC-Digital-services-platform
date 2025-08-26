import React from "react";

const values = [
  "Innovation-driven",
  "Customer-first Approach",
  "Data Security & Privacy",
  "Integrity & Transparency",
];

const testimonials = [
  {
    name: "Ananya Rao",
    company: "TechNova Inc.",
    feedback:
      "Exceptional experience! Their IT team transformed our infrastructure and saved us hours weekly.",
  },
  {
    name: "James Wright",
    company: "RetailSync",
    feedback:
      "We saw a 200% growth in lead conversions after their digital campaign revamp.",
  },
];

const clients = [
  "TechNova Inc.",
  "RetailSync",
  "MediCare Global",
  "AgroTech Ltd.",
  "CloudSecure Corp.",
];

export default function ServicePage() {
  return (
    <div style={{ padding: "3rem 2rem", maxWidth: 1200, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
        Who We Are
      </h1>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Our Mission</h2>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          To empower businesses with innovative digital solutions that simplify operations and accelerate growth.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Our Vision</h2>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          To be the most trusted digital transformation partner for enterprises worldwide.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Our Core Values</h2>
        <ul>
          {values.map((val, i) => (
            <li key={i} style={{ fontSize: "1rem", color: "#444", marginBottom: "0.5rem" }}>• {val}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Client Testimonials</h2>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: "#f7fafc", padding: "1.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
            <p style={{ fontStyle: "italic", color: "#333" }}>"{t.feedback}"</p>
            <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>{t.name}, <span style={{ color: "#718096" }}>{t.company}</span></p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Our Clients</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {clients.map((client, i) => (
            <div key={i} style={{ background: "#edf2f7", padding: "1rem 1.5rem", borderRadius: "6px" }}>
              {client}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#2b6cb0", marginBottom: "1rem" }}>Project Stats</h2>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#2f855a" }}>180+</h3>
            <p style={{ color: "#444" }}>Projects Delivered</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#2f855a" }}>50+</h3>
            <p style={{ color: "#444" }}>Enterprise Clients</p>
          </div>
        </div>
      </section>

      <div style={{ textAlign: "center" }}>
        <a
          href="/login"
          style={{
            backgroundColor: "#2b6cb0",
            color: "white",
            padding: "0.75rem 2rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
