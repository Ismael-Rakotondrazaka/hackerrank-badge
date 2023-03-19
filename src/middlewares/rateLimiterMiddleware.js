import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const rateLimitWindow = process.env.RATE_LIMIT_WINDOW
  ? +process.env.RATE_LIMIT_WINDOW
  : undefined;

const rateLimitMax = process.env.RATE_LIMIT_MAX
  ? +process.env.RATE_LIMIT_MAX
  : undefined;

const rateLimiterMiddleware = rateLimit({
  windowMs: rateLimitWindow,
  max: rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    try {
      throw new Error("rate");
    } catch (err) {
      next(err);
    }
  },
});

export { rateLimiterMiddleware };
