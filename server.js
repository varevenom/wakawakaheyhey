const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// FOOTBALL API
app.get("/api/football", async (req, res) => {
  try {
    const response = await fetch("https://free-api-live-football-data.p.rapidapi.com/football-current-live", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120",
        "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Football API failed" });
  }
});

// CRICKET API
app.get("/api/cricket", async (req, res) => {
  try {
    const response = await fetch("https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-matches", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120",
        "X-RapidAPI-Host": "free-cricbuzz-cricket-api.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Cricket API failed" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});