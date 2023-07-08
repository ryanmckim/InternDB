import {
  displayUser,
  newPassword,
  deleteUser,
  createUser,
} from "../controllers/user";
import { Router } from "express";

const router = Router();

// Test route
router.route("/").post(createUser);

// GET request for profile page
router.route("/:userID").get(displayUser);

// PUT request for changing password
router.route("/:userID").put(newPassword);

// DELETE request for account deletion
router.route("/:userID").delete(deleteUser);

module.exports = router;
