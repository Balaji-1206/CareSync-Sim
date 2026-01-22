const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Store latest data in memory (simple & enough for now)
let latestVitals = null;

// -------- HOME ROUTE --------
app.get("/", (req, res) => {
  res.send("✅ CareSync backend is running");
});

// -------- RECEIVE DATA FROM WOKWI --------
app.post("/vitals", (req, res) => {
  latestVitals = req.body;

  console.log("📥 Data received from Wokwi:");
  console.log(latestVitals);

  res.json({ status: "received" });
});

// -------- VIEW DATA IN BROWSER --------
app.get("/vitals", (req, res) => {
  if (!latestVitals) {
    return res.json({ message: "No data received yet" });
  }
  res.json(latestVitals);
});

// -------- START SERVER --------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
