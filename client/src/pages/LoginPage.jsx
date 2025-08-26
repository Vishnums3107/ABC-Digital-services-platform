import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar"; // Optional
import Footer from "../components/Footer"; // Optional

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;
