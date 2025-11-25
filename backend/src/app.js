import "dotenv/config";
import express from "express";
import cors from "cors";
// import session from "express-session";
import session from "cookie-session";
import { config } from "./config/app.config.js";
import { connectDatabase } from "./config/database.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { asyncHandler } from "./middlewares/asyncHandler.middleware.js";
import { BadRequestException } from "./utils/appError.js";

import passport from "passport";
import "./config/passport.config.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import workspaceRoutes from "./routes/workspace.route.js";
import memberRoutes from "./routes/member.route.js";
import isAuthenticated from "./middlewares/isAuthenticated.middleware.js";
import projectRoutes from "./routes/project.route.js";
import taskRoutes from "./routes/task.route.js";
import { passportAuthenticateJWT } from "./config/passport.config.js";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: config.SESSION_SECRET, // wajib
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // 1 hari
//       secure: config.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: "lax",
//     },
//   })
// );

// --- Patch dummy functions untuk Passport ---

// ini untuk cookie-session
// app.use(
//   session({
//     name: "session",
//     keys: [config.SESSION_SECRET], // ← ini style cookie-session
//     maxAge: 24 * 60 * 60 * 1000,
//     secure: config.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "lax",
//   })
// );
// app.use((req, res, next) => {
//   if (!req.session.regenerate) req.session.regenerate = (cb) => cb && cb();
//   if (!req.session.destroy) req.session.destroy = (cb) => cb && cb();
//   if (!req.session.save) req.session.save = (cb) => cb && cb(); // <-- tambahkan ini
//   next();
// });

app.use(passport.initialize());
// app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// health check route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJWT, userRoutes);
app.use(`${BASE_PATH}/workspace`, passportAuthenticateJWT, workspaceRoutes);
app.use(`${BASE_PATH}/member`, passportAuthenticateJWT, memberRoutes);
app.use(`${BASE_PATH}/project`, passportAuthenticateJWT, projectRoutes);
app.use(`${BASE_PATH}/task`, passportAuthenticateJWT, taskRoutes);

app.use(errorHandler);

// Export app
export default app;
