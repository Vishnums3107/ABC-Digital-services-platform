import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext.jsx";

// Styled-components remain the same...
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7fafc;
`;
const LoginBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
`;
const Button = styled.button`
  width: 100%;
  background: #3182ce;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #2b6cb0;
  }
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;
const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth(); // Get login function from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    
    setError("");

    const result = await login(email, password); // Call login from context

    if (result.success) {
      navigate(result.role === "admin" ? "/admin/dashboard" : "/customer/home");
    } else {
      setError(result.message || "An unknown error occurred.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login to Your Account</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </form>
        <Button
          style={{ marginTop: "1rem", background: "#4A5568" }}
          onClick={() => navigate("/signup")}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginForm;
