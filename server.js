const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

/*
  PUT YOUR FRESH NEW KEYS HERE
  If both APIs use the same RapidAPI key, you can paste the same key in both places.
*/
const FOOTBALL_API_KEY = "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120";
const CRICKET_API_KEY =  "2462e59935mshe59f5a9e55b0a81p1ce4b7jsn17169f4c8120";

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/health", (req, res) => {
  res.send("Sports server running ⚽🏏");
});

// Football API
app.get("/api/football", async (req, res) => {
  try {
    const response = await fetch(
      "https://free-football-api-data.p.rapidapi.com/football-get-popular-leagues",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "free-football-api-data.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Football API error:", error);
    res.status(500).json({ error: "Football API failed" });
  }
});

// Cricket API
app.get("/api/cricket", async (req, res) => {
  try {
    const response = await fetch(
      "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": CRICKET_API_KEY,
          "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Cricket API error:", error);
    res.status(500).json({ error: "Cricket API failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});