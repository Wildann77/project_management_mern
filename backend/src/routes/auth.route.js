import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config.js";
import {
  googleLoginCallback,
  loginController,
  logOutController,
  registerUserController,
} from "../controllers/auth.controller.js";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

// Register & Login
authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

// Logout
authRoutes.post("/logout", logOutController);

// Google OAuth
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
    session: false,
  }),
  googleLoginCallback
);

export default authRoutes;
