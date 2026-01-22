const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// store latest data in memory
let latestVitals = null;

// home check
app.get("/", (req, res) => {
  res.send("✅ CareSync backend is running");
});

// receive data from Wokwi (POST)
app.post("/vitals", (req, res) => {
  latestVitals = req.body;

  console.log("📥 Data received from Wokwi:");
  console.log(latestVitals);

  res.json({ status: "received" });
});

// view latest data (GET)
app.get("/vitals", (req, res) => {
  if (!latestVitals) {
    return res.json({ message: "No data received yet" });
  }
  res.json(latestVitals);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on port ${PORT}`);
});
app.post("/vitals", (req, res) => {
  console.log("🔥 POST /vitals RECEIVED");
  res.json({ received: true });
});
