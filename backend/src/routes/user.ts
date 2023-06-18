import { displayUser, newPassword, deleteUser } from "../controllers/user";
import { Router } from "express";

const router = Router();

// GET request for profile page
router.route("/:userID").get(displayUser);

// PUT request for changing password
router.route("/:userID/password").put(newPassword);

// DELETE request for account deletion
router.route("/:userID").delete(deleteUser);

module.exports = router;
