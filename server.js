// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001; // We'll run on localhost:3001

// 1) Allow JSON bodies in requests
app.use(express.json());

// 2) Allow cross-origin requests (so your separate front-end can call us)
app.use(cors());

// ============ IN-MEMORY DATA ============
// This data will persist as long as the server stays running.
// If you stop the server, it resets to zero/empty.
let viewCount = 0;
let upvoteCount = 0;
let comments = []; // array of { name: string, comment: string }

// ============ ROUTES ============

// (A) VIEW COUNT
// GET current view count
app.get("/api/views", (req, res) => {
  res.json({ viewCount });
});

// POST to increment the view count by 1
app.post("/api/views/increment", (req, res) => {
  viewCount++;
  // respond with the updated count
  res.json({ success: true, viewCount });
});

// (B) UPVOTES
// GET upvote count
app.get("/api/upvotes", (req, res) => {
  res.json({ upvoteCount });
});

// POST to increment upvote count by 1
app.post("/api/upvotes", (req, res) => {
  upvoteCount++;
  res.json({ success: true, upvoteCount });
});

// (C) COMMENTS
// GET all comments
app.get("/api/comments", (req, res) => {
  // returns an array, e.g. [ { name, comment }, ... ]
  res.json({ comments });
});

// POST a new comment
app.post("/api/comments", (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: "Name and comment are required." });
  }
  comments.push({ name, comment });
  res.json({ success: true, comments });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
