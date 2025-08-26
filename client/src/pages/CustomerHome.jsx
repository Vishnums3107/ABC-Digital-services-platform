import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// The base URL for your API, read from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const CustomerHome = () => {
  const { token, user } = useAuth();
  const [services, setServices] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        // Use the API_URL variable
        const servicesRes = await fetch(`${API_URL}/api/services`);
        if (!servicesRes.ok) throw new Error("Failed to fetch services.");
        const servicesData = await servicesRes.json();
        setServices(Array.isArray(servicesData) ? servicesData : []);

        if (token) {
          // Use the API_URL variable
          const purchasesRes = await fetch(`${API_URL}/api/purchase/my-purchases`, {
            headers: { "Authorization": `Bearer ${token}` },
          });
          if (!purchasesRes.ok) throw new Error("Failed to fetch purchase history.");
          const purchasesData = await purchasesRes.json();
          setPurchased(Array.isArray(purchasesData.purchases) ? purchasesData.purchases : []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleBuy = async (service) => {
    if (!token) return alert("Please log in to make a purchase.");
    const alreadyPurchased = purchased.some(p => p.serviceId === service._id);
    if (alreadyPurchased) return alert(`You have already purchased "${service.name}".`);

    try {
      // Use the API_URL variable
      const response = await fetch(`${API_URL}/api/purchase/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: service._id,
          serviceName: service.name,
          price: service.price,
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Purchase failed.");
      setPurchased(prev => [...prev, { serviceId: service._id, serviceName: service.name }]);
      alert(`Successfully purchased: ${service.name}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) return <div>Loading services...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>Welcome, {user?.firstName || 'Customer'}!</h1>
        <p>Here are our available services.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {services.map((service) => {
            const isPurchased = purchased.some(p => p.serviceId === service._id);
            return (
              <div key={service._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <ul>{service.features.map((feature, i) => <li key={i}>✔️ {feature}</li>)}</ul>
                <p><strong>Price:</strong> ${service.price}</p>
                <button onClick={() => handleBuy(service)} disabled={isPurchased} style={{ padding: "0.5rem 1rem", marginTop: "1rem", cursor: isPurchased ? 'not-allowed' : 'pointer', backgroundColor: isPurchased ? '#a0aec0' : '#3182ce', color: 'white', border: 'none', borderRadius: '6px' }}>
                  {isPurchased ? "Purchased" : "Buy Now"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerHome;
