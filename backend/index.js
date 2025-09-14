const express = require("express");
const cors = require("cors");
require("dotenv").config();

const linksRouter = require("./routes/links");
const { db } = require("./config/firebase"); // Import only

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/links", linksRouter);
// Root route (for browser check)
app.get("/", (req, res) => {
  res.send("<h2>✅ Backend is running on port 5000</h2>");
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
