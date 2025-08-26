    const mongoose = require("mongoose");
    require('dotenv').config(); // Make sure to require dotenv at the top

    const connectDB = async () => {
    try {
      // Use the environment variable for the connection string
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connected");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
    };

    module.exports = connectDB;