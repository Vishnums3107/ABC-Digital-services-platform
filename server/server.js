const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/purchase", require("./routes/purchase"));
app.use("/api/services", require("./routes/services"));
app.use("/api/seeder", require("./routes/seeder")); // <-- ADD THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
