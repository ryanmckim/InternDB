import { displayUser, newPassword, deleteUser } from "../controllers/user";
import { protect } from "../middleware/auth";
import { Router } from "express";

const router = Router();

// // Test route
// router.route("/").post(createUser);

// GET request for profile page
router.route("/:userID").get(protect, displayUser);

// PUT request for changing password
router.route("/:userID").put(protect, newPassword);

// DELETE request for account deletion
router.route("/:userID").delete(protect, deleteUser);

module.exports = router;
