import express from "express";
import type { Application } from "express";
export function createServer (): Application {
    const app = express();
    app.get("/", (req, res) => {
        res.send("Hello World!");
    })
    return app;
}