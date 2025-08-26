const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Models
const Service = require('./models/Service');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// This is the data that will be inserted into the database
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

// Import data into DB
const importData = async () => {
  try {
    // Clear existing services to prevent duplicates
    await Service.deleteMany(); 
    
    await Service.insertMany(services);

    console.log('✅ Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Destroy data from DB
const destroyData = async () => {
  try {
    await Service.deleteMany();
    console.log('❌ Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Check for command line arguments to run the correct function
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
