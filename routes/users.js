const router = require("express").Router();
const User = require("../models/User");

// FOLLOW USER (Friend Structure)
router.post("/follow", async (req, res) => {
  const { followerId, followingId } = req.body;

  // Cannot follow yourself
  if (followerId === followingId) {
    return res.status(403).json("You cannot follow yourself");
  }

  try {
    const userToFollow = await User.findById(followingId);
    const currentUser = await User.findById(followerId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json("User not found");
    }

    if (!userToFollow.followers.map(id => id.toString()).includes(followerId)) {
    userToFollow.followers.push(followerId);
    currentUser.following.push(followingId);

      await userToFollow.save();
      await currentUser.save();

      return res.status(200).json("User followed successfully");
    } else {
      return res.status(403).json("You already follow this user");
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
