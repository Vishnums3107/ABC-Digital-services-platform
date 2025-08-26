const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  features: [String], // Added for feature list
});

module.exports = mongoose.model("Service", ServiceSchema);
