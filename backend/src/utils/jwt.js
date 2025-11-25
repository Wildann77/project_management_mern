import jwt from "jsonwebtoken";

const defaults = {
  audience: "user", // 👈 jangan array, cukup string
};

export const accessTokenSignOptsAndSecret = {
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  secret: process.env.JWT_SECRET || "supersecret", // pastikan sama dengan passport
};

export const SignJwtToken = (payload, options) => {
  const { secret, ...opts } = options || accessTokenSignOptsAndSecret;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};
