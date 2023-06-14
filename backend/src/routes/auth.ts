import { Router } from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword").patch(resetPassword);

module.exports = router;
