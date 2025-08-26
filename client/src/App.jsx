import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";  // Corrected: Removed the trailing dot

// Import Pages
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Buy from "./pages/Buy";
import LoginPage from "./pages/LoginPage";
import CustomerHome from "./pages/CustomerHome";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import AboutPage from './pages/AboutPage';
// Simplified PrivateRoute component using the AuthContext
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, isAuthLoading } = useAuth();

  // Show a loading indicator while the initial authentication check is in progress
  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not in the allowed list, redirect to the home page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the requested component
  return element;
};

function App() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Protected Customer Route */}
          <Route
            path="/customer/home"
            element={<PrivateRoute element={<CustomerHome />} allowedRoles={["customer", "admin"]} />} // Also allow admin to see customer home
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
