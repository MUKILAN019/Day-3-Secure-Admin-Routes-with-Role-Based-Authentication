const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Fix the route path to match what the frontend is requesting
router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ role: req.user.role, content: "Confidential admin content." });
});

module.exports = router;