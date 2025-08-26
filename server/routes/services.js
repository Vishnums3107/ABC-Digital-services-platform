const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    if (!services.length) {
      return res.status(404).json({ success: false, message: "No services found" });
    }
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, category, price, features } = req.body;
    if (!name || !description || !category || !price || !features) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newService = new Service({ name, description, category, price, features });
    await newService.save();
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
});

module.exports = router;