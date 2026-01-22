const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (latest data only)
let latestVitals = null;

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Receive data from Wokwi
app.post("/vitals", (req, res) => {
  latestVitals = req.body;
  console.log("📥 Received vitals:", latestVitals);
  res.json({ status: "ok" });
});

// View latest data in browser
app.get("/vitals", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (latestVitals === null) {
    return res.json({ message: "No data received yet" });
  }
  res.json(latestVitals);
});

// Start server (Render-compatible)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server listening on port", PORT);
});
