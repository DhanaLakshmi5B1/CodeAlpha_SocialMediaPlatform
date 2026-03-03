const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// In-memory posts
let posts = [];

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create post
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    text: req.body.text,
    likes: 0,
    comments: []
  };

  posts.push(newPost);
  res.json(newPost);
});

// Like post
app.post("/posts/:id/like", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send("Post not found");

  post.likes++;
  res.json(post);
});

// Add comment
app.post("/posts/:id/comment", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send("Post not found");

  post.comments.push(req.body.comment);
  res.json(post);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});