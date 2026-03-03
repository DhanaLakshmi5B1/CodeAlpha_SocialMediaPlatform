const express = require("express");
const router = express.Router();

let posts = [
    { id: 1, text: "Hello First Post", likes: 0, comments: [] }
];

router.get("/", (req, res) => {
    res.json(posts);
});

router.post("/", (req, res) => {
    const { text } = req.body;

    const newPost = {
        id: posts.length + 1,
        text,
        likes: 0,
        comments: []
    };

    posts.push(newPost);
    res.json(newPost);
});

module.exports = router;