import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// The base URL for your API, read from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!token) {
        setError("Authentication token not found.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError("");
      try {
        // Use the API_URL variable
        const response = await fetch(`${API_URL}/api/purchase/all`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch purchase data.");
        }
        const data = await response.json();
        const purchaseData = Array.isArray(data.purchases) ? data.purchases : [];
        setPurchases(purchaseData);
        const serviceSummary = purchaseData.reduce((acc, p) => {
          const serviceId = p.serviceId;
          if (!acc[serviceId]) {
            acc[serviceId] = { name: p.serviceName, total: 0, count: 0 };
          }
          acc[serviceId].total += p.price;
          acc[serviceId].count += 1;
          return acc;
        }, {});
        setSummary(serviceSummary);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, [token]);

  const thStyle = { border: "1px solid #ccc", padding: "0.75rem", background: "#f0f0f0", textAlign: "left" };
  const tdStyle = { border: "1px solid #ccc", padding: "0.75rem" };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div style={{ color: "red", padding: "2rem" }}>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>Admin Dashboard</h1>
        <h2 style={{ marginTop: "2rem" }}>📊 Service Summary</h2>
        <table style={{ width: "100%", marginBottom: "2rem", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Total Purchases</th>
              <th style={thStyle}>Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(summary).length > 0 ? (
              Object.values(summary).map((s, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.count}</td>
                  <td style={tdStyle}>{s.total.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" style={tdStyle}>No summary data available.</td></tr>
            )}
          </tbody>
        </table>
        <h2 style={{ marginTop: "2rem" }}>🧾 Individual Purchases</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Price ($)</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0 ? (
              purchases.map((p) => (
                <tr key={p._id}>
                  <td style={tdStyle}>{p.userId?.email || 'N/A'}</td>
                  <td style={tdStyle}>{p.serviceName}</td>
                  <td style={tdStyle}>{p.price.toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(p.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={tdStyle}>No purchases have been made yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
