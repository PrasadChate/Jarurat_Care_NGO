const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllUsers);

module.exports = router; // Ensure this line is present
