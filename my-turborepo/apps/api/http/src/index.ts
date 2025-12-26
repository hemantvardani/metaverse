import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes.js";
import "dotenv/config";

const app = express();

// CORS configuration - allow frontend to call API
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Next.js default port
    credentials: true, // Allow cookies (httpOnly cookies)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", router);

app.listen(process.env.PORT || 3002);
