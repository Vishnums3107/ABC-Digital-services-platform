const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/authmiddleware');

// The data to be inserted
const services = [
  {
    name: "Web Development",
    description: "Custom web applications with modern architectures and enterprise-grade security",
    category: "Development",
    price: 2500,
    features: ["React/Node.js", "PWA", "API Development", "24/7 Support"]
  },
  {
    name: "Digital Marketing",
    description: "AI-powered campaigns that maximize conversions and ROI",
    category: "Marketing",
    price: 1800,
    features: ["SEO", "PPC", "Automation", "Analytics"]
  },
  {
    name: "IT Solutions",
    description: "End-to-end IT infrastructure management with guaranteed SLAs",
    category: "IT",
    price: 3200,
    features: ["Cloud Migration", "Cybersecurity", "Helpdesk", "Compliance"]
  },
  {
    name: "Social Media Management",
    description: "Strategic social presence that drives engagement and growth",
    category: "Marketing",
    price: 1500,
    features: ["Content Strategy", "Campaigns", "Influencers", "Analytics"]
  },
  {
    name: "Media Production",
    description: "Professional content creation for digital platforms and campaigns",
    category: "Media",
    price: 2800,
    features: ["Video Production", "Motion Graphics", "Brand Design", "Photography"]
  }
];

/**
 * @route   GET /api/seeder/import
 * @desc    Seeds the database with initial service data
 * @access  Private (Admin Only)
 */
router.get('/import', auth, async (req, res) => {
  // Protect this route to ensure only an admin can run it
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Access denied.' });
  }

  try {
    // Clear existing services to prevent duplicates
    await Service.deleteMany({});
    
    // Insert the new service data
    await Service.insertMany(services);

    res.status(200).json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    console.error("Seeder Error:", err.message);
    res.status(500).json({ success: false, message: 'Server error during database seeding.' });
  }
});

module.exports = router;
