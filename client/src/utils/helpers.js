// src/utils/helpers.js
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const showToast = (type, message) => {
  // You can implement a proper toast notification here
  // For now, we'll just use alert
  alert(`${type.toUpperCase()}: ${message}`);
};