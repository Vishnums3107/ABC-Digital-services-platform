import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./Signup.css"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// The base URL for your API, read from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  
  const showToast = (type, message) => alert(`${type.toUpperCase()}: ${message}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email" });
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
      setErrors({ ...errors, password: validatePassword(value) ? "" : "Password is too weak" });
    }
    if (name === "confirmPassword") setErrors({ ...errors, confirmPassword: value === formData.password ? "" : "Passwords do not match" });
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!validatePassword(formData.password)) newErrors.password = "Password is too weak";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Use the API_URL variable
      const signupResponse = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const signupData = await signupResponse.json();
      if (!signupResponse.ok || !signupData.success) {
        throw new Error(signupData.message || "Signup failed");
      }
      showToast("success", "Account created! Logging you in...");
      const loginResult = await login(formData.email, formData.password);
      if (!loginResult.success) {
        throw new Error(loginResult.message || "Auto-login failed. Please log in manually.");
      }
      navigate(loginResult.role === "admin" ? "/admin/dashboard" : "/customer/home");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return "#ff4d4d";
      case 2: return "#ffac1c";
      case 3: return "#52c41a";
      case 4: return "#237804";
      default: return "#e0e0e0";
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Create an Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Form inputs remain the same */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} className={errors.firstName ? "error" : ""} />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} className={errors.lastName ? "error" : ""} />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className={errors.password ? "error" : ""} />
              <div className="password-strength-meter">
                <div className="strength-bar" style={{ width: `${passwordStrength * 25}%`, backgroundColor: getPasswordStrengthColor() }} />
              </div> 
                
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? "error" : ""} />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="admin">Administrator</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <button type="submit" className="signup-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <div className="signup-footer">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
