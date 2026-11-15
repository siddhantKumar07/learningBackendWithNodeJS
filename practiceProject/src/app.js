import express from"express";
import "dotenv/config";
import authRouter from "./modules/auth/auth.route.js";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(cookieParser());

/**
 * authentication routes
 * public routes
 * api - /auth/register
 */
app.use("/auth", authRouter);
export default app;