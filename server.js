const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Your RapidAPI key
const RAPIDAPI_KEY = "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120";

// Serve static files
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Football live matches
app.get("/api/football", async (req, res) => {
  try {
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Football API error:", error);
    res.status(500).json({ error: "Failed to fetch football data" });
  }
});

// Football upcoming matches fallback
app.get("/api/football-upcoming", async (req, res) => {
  try {
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?next=10", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Football upcoming API error:", error);
    res.status(500).json({ error: "Failed to fetch upcoming football data" });
  }
});

// Cricket live matches
app.get("/api/cricket", async (req, res) => {
  try {
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Cricket API error:", error);
    res.status(500).json({ error: "Failed to fetch cricket data" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.send("Sports server running ⚽🏏");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});