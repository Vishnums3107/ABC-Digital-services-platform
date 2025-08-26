const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  // Corrected the type from Number to ObjectId and added a reference
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service',
    required: true 
  },
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
