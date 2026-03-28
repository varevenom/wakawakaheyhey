const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const RAPIDAPI_KEY = "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120";

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// FOOTBALL using Free API Live Football Data
app.get("/api/football", async (req, res) => {
  try {
    const response = await fetch(
      "https://free-api-live-football-data.p.rapidapi.com/football-get-all-matches-by-league?leagueid=47",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "free-api-live-football-data.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Football API error:", error);
    res.status(500).json({ error: "Football error" });
  }
});

// CRICKET using Cricbuzz
app.get("/api/cricket", async (req, res) => {
  try {
    const response = await fetch(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Cricket API error:", error);
    res.status(500).json({ error: "Cricket error" });
  }
});

app.get("/health", (req, res) => {
  res.send("Sports server running ⚽🏏");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});