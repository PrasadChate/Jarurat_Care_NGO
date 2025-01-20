const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors"); // Import CORS package

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors()); // Allows all origins by default, can be restricted to specific origins

app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api", userRoutes);

// Serve frontend static files
const frontendPath = path.join(__dirname, "../jarurat_care_frontend");
app.use(express.static(frontendPath));

// Catch-all route to serve index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
