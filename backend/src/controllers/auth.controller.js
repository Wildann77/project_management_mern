import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { config } from "../config/app.config.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { registerUserService } from "../services/auth.service.js";
import passport from "passport";
import { registerSchema } from "../validations/auth.validation.js";
import { SignJwtToken } from "../utils/jwt.js";

export const googleLoginCallback = asyncHandler(async (req, res) => {
  const jwt = req.jwt;
  const currentWorkspace = req.user?.currentWorkspace;

  if (!jwt) {
    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
    );
  }

  return res.redirect(
    `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=success&access_token=${jwt}&current_workspace=${currentWorkspace}`
  );

  // return res.redirect(
  //   `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
  // );
});

export const registerUserController = asyncHandler(async (req, res) => {
  const body = registerSchema.parse({ ...req.body });

  await registerUserService(body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});

export const loginController = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: info?.message || "Invalid email or password",
      });
    }

    // req.logIn(user, (err) => {
    //   if (err) {
    //     return next(err);
    //   }

    //   return res.status(HTTPSTATUS.OK).json({
    //     message: "Logged in successfully",
    //     user,
    //   });
    // });
    const access_token = SignJwtToken({ userId: user._id });
    
    return res.status(HTTPSTATUS.OK).json({
      message: "Logged in successfully",
      access_token,
      user,
    });
  })(req, res, next);
});

export const logOutController = asyncHandler(async (req, res) => {
  // Logout untuk JWT = hapus token di client
  return res.status(HTTPSTATUS.OK).json({
    message: "Logged out successfully",
  });
});
