import React from "react";

export default function Hero() {
  return (
    <section style={{ height: "80vh", backgroundImage: "url('/logo.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "white", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}></div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, padding: "2rem" }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>ABC OFFL</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>ABC corporate solutions</p>
        <a href="https://www.abcconsultants.in/" target="_blank" rel="noopener noreferrer">
          <button style={{ backgroundColor: "black", color: "white", fontSize: "1rem", padding: "0.75rem 2rem", borderRadius: "8px", border: "none", cursor: "pointer", transition: "0.3s" }}>
            ABC's Official Website
          </button>
        </a>
      </div>
    </section>
  );
}