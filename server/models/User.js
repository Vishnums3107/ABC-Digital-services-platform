const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["admin", "customer", "vendor"], // Added vendor to match signup form
    default: "customer" 
  },
});

module.exports = mongoose.model("User", userSchema);
