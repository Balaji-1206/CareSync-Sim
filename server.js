// -------------------- IMPORTS --------------------
const express = require("express");
const cors = require("cors");

// -------------------- APP SETUP --------------------
const app = express();
app.use(cors());
app.use(express.json());

// -------------------- TEST ROUTE --------------------
// Open this in browser to check server status
app.get("/", (req, res) => {
  res.send("✅ CareSync API is running");
});

// -------------------- RECEIVE ICU VITALS --------------------
app.post("/vitals", (req, res) => {
  const { temp, hr, spo2, bp, rr, ecg } = req.body;

  app.get("/vitals", (req, res) => {
  res.send("✅ /vitals endpoint is alive. Use POST to send data.");
});


  console.log("\n----- ICU VITALS RECEIVED -----");
  console.log("Temperature :", temp, "°C");
  console.log("Heart Rate  :", hr, "bpm");
  console.log("SpO2        :", spo2, "%");
  console.log("MAP (BP)    :", bp, "mmHg");
  console.log("Resp Rate   :", rr, "/min");
  console.log("ECG Signal  :", ecg);

  // -------- ALERT LOGIC --------
  let alert = false;

  if (temp >= 38) {
    console.log("🚨 Fever detected");
    alert = true;
  }
  if (spo2 < 92) {
    console.log("🚨 Low SpO2 detected");
    alert = true;
  }
  if (hr > 120) {
    console.log("🚨 High heart rate detected");
    alert = true;
  }
  if (bp < 65) {
    console.log("🚨 Low blood pressure detected");
    alert = true;
  }

  if (alert) {
    console.log("🚑 PATIENT STATUS: UNSTABLE");
  } else {
    console.log("✅ PATIENT STATUS: STABLE");
  }

  // -------- RESPONSE --------
  res.json({
    status: "ok",
    patientStatus: alert ? "unstable" : "stable",
    timestamp: new Date().toISOString()
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CareSync API running on port ${PORT}`);
});

