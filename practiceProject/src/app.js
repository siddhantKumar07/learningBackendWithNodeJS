import express from"express";
import "dotenv/config";
import authRouter from "./modules/auth/auth.route.js";

const app = express();

/**
 * authentication routes
 * public routes
 * api - /auth/register
 */
app.use("/auth", authRouter);
export default app;