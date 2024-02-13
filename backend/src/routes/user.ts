import { PERMISSIONS } from "../constants/permissions";
import { displayUser, newPassword, deleteUser } from "../controllers/user";
import { protect, hasPermission } from "../middleware/auth";
import { Router } from "express";

const router = Router();

router.use(protect);

// GET request for profile page
router
  .route("/")
  .get(
    hasPermission([PERMISSIONS.VIEW_OWN_PROFILE, PERMISSIONS.VIEW_ANY_PROFILE]),
    displayUser
  );

// PUT request for changing password
router.route("/").put(hasPermission([PERMISSIONS.UPDATE_OWN_PWD]), newPassword);

// DELETE request for account deletion
router
  .route("/")
  .delete(
    hasPermission([PERMISSIONS.DELETE_OWN_USER, PERMISSIONS.DELETE_ANY_USER]),
    deleteUser
  );

module.exports = router;
