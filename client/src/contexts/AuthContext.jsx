import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

// The base URL for your API, read from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                const isExpired = decodedUser.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                logout();
            }
        }
        setIsAuthLoading(false);
    }, [token]);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            // Use the API_URL variable
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || "Login failed");
            }
            localStorage.setItem("token", data.token);
            setToken(data.token);
            return { success: true, role: data.role };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
