import { PERMISSIONS } from "../constants/permissions";
import { displayUser, newPassword, deleteUser } from "../controllers/user";
import { hasOwnUserPerm, protect, hasPermission } from "../middleware/auth";
import { Router } from "express";

const router = Router();

router.use(protect);

// GET request for profile page
router.route("/:id").get(hasOwnUserPerm, displayUser);

// PUT request for changing password
router
  .route("/:id")
  .put(
    hasPermission([PERMISSIONS.UPDATE_OWN_PWD]),
    hasOwnUserPerm,
    newPassword
  );

// DELETE request for account deletion
router
  .route("/:id")
  .delete(
    hasPermission([PERMISSIONS.DELETE_ANY_USER]),
    hasOwnUserPerm,
    deleteUser
  );

module.exports = router;
