import { cacheMiddleware, errorMiddleware } from "./middlewares/index.js";
import { badgeRoutes } from "./routes/api/v1/badges/index.js";
import { notFoundController } from "./controllers/index.js";

import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

const proxies = process.env.PROXIES ? +process.env.PROXIES : false;
app.set("trust proxy", proxies);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cacheMiddleware);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/badges", badgeRoutes);

app.get("/status/health", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("*", notFoundController);

app.use(errorMiddleware);

export { app };
