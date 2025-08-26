const express = require("express");
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const Purchase = require("../models/Purchase");
const Service = require("../models/Service"); // Import Service model for validation
const auth = require("../middleware/authmiddleware.js");

// POST /api/purchase/buy
router.post("/buy", auth, async (req, res) => {
  const { serviceId, serviceName, price } = req.body;

  // --- Start of new validation ---
  // 1. Check for required fields
  if (!serviceId || !serviceName || price === undefined) {
    return res.status(400).json({ success: false, message: "Missing required purchase information." });
  }

  // 2. Check if the serviceId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ success: false, message: "Invalid Service ID format." });
  }
  // --- End of new validation ---

  try {
    // 3. Verify that the service actually exists in the database
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
        return res.status(404).json({ success: false, message: "Service not found." });
    }

    // 4. Check if the user has already bought this service
    const existingPurchase = await Purchase.findOne({ userId: req.user.id, serviceId: serviceId });
    if (existingPurchase) {
      return res.status(400).json({ success: false, message: "You have already purchased this service." });
    }

    // 5. Create and save the new purchase
    const newPurchase = new Purchase({
      userId: req.user.id,
      serviceId: serviceId,
      serviceName: serviceName,
      price: price,
    });

    await newPurchase.save();
    
    res.status(201).json({ success: true, message: "Purchase successful!", purchase: newPurchase });

  } catch (err) {
    // This will now catch any errors during the database operations
    console.error("--- PURCHASE ROUTE CRASH ---");
    console.error("User ID:", req.user.id);
    console.error("Request Body:", req.body);
    console.error("Error Details:", err);
    console.error("--- END OF CRASH REPORT ---");
    res.status(500).json({ success: false, message: "An unexpected server error occurred." });
  }
});

// GET /api/purchase/my-purchases
router.get("/my-purchases", auth, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.id }).select("serviceId serviceName");
    res.json({ success: true, purchases });
  } catch (err) {
    console.error("Fetch My-Purchases Error:", err);
    res.status(500).json({ success: false, message: "Server error fetching your purchases." });
  }
});


// GET /api/purchase/all (for Admins)
router.get("/all", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied." });
  }
  try {
    const purchases = await Purchase.find().populate("userId", "email firstName lastName");
    res.json({ success: true, purchases });
  } catch (err) {
    console.error("Fetch All Purchases Error:", err);
    res.status(500).json({ success: false, message: "Server error fetching all purchases." });
  }
});

module.exports = router;
