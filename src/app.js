import { badgeRoutes } from "./routes/api/v1/badges/index.js";

import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

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

export { app };
