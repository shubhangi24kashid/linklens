const express = require("express");
const cors = require("cors");
require("dotenv").config();

const linksRouter = require("./routes/links");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/links", linksRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
