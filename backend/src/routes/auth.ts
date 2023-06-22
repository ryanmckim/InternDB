import { Router } from "express";
import { registerUser, loginUser, verifyUser } from "../controllers/auth";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/verify/:token").get(verifyUser);

/* for future features */
// router.route("/forgotpassword").post(forgotPassword);

// router.route("/resetpassword").patch(resetPassword);

module.exports = router;
