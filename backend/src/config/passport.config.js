import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { config } from "./app.config.js";
import { NotFoundException } from "../utils/appError.js";
import { ProviderEnum } from "../enums/account-provider.enum.js";
import {
  loginOrCreateAccountService,
  verifyUserService,
  FindUserByIdService,
} from "../services/auth.service.js";
import { SignJwtToken } from "../utils/jwt.js";

// =======================
// Google OAuth Strategy
// =======================
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;

        if (!googleId) {
          throw new NotFoundException("Google ID (sub) is missing");
        }

        const { user } = await loginOrCreateAccountService({
          provider: ProviderEnum.GOOGLE,
          displayName: profile.displayName,
          providerId: googleId,
          picture,
          email,
        });

        const jwt = SignJwtToken({ userId: user._id });
        req.jwt = jwt;

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// =======================
// Local Strategy
// =======================
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        console.log("DEBUG LocalStrategy -> email:", email);
        console.log("DEBUG LocalStrategy -> password:", password);

        const user = await verifyUserService({ email, password });
        console.log("DEBUG LocalStrategy -> user found:", user);

        return done(null, user);
      } catch (error) {
        console.error("DEBUG LocalStrategy -> error:", error);
        return done(error, false, { message: error?.message });
      }
    }
  )
);

// =======================
// JWT Strategy
// =======================
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
  // audience: "user",
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    console.log("DEBUG JwtStrategy payload:", payload); // <--- cek isi token

    try {
      const user = await FindUserByIdService(payload.userId);
      if (!user) {
        console.log("DEBUG JwtStrategy -> user not found");
        return done(null, false);
      }
      console.log("DEBUG JwtStrategy -> user found:", user.email);
      return done(null, user);
    } catch (error) {
      console.error("DEBUG JwtStrategy error:", error);
      return done(error, false);
    }
  })
);

// =======================
// Serialize / Deserialize
// =======================
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export const passportAuthenticateJWT = passport.authenticate("jwt", {
  session: false,
});
