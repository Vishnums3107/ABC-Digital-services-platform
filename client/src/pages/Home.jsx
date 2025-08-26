import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CompanyInsights from "../components/CompanyInsights";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CompanyInsights />
      <Footer />
    </>
  );
}
