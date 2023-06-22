import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

/* for future features */
// router.route("/forgotpassword").post(forgotPassword);

// router.route("/resetpassword").patch(resetPassword);

module.exports = router;
