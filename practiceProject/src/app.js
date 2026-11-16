import express from"express";
import "dotenv/config";
import authRouter from "./modules/auth/auth.route.js";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

/**
 * authentication routes
 * public routes
 * api - /api/auth/
 */
app.use("/api/auth", authRouter);
export default app;