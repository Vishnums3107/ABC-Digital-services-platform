import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "black", padding: "1rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem" }}>
        <div className="brand">
          <img src="/1.png" alt="Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>ABC OFFL</Link>
        </div>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginLeft: "2rem" }}><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
          <li style={{ marginLeft: "2rem" }}><Link to="/buy" style={{ color: "white", textDecoration: "none" }}>Products</Link></li>
          <li style={{ marginLeft: "2rem" }}><Link to="/apply" style={{ color: "white", textDecoration: "none" }}>Services</Link></li>
          <li style={{ marginLeft: "2rem" }}><Link to="/about" style={{ color: "white", textDecoration: "none" }}>About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
}