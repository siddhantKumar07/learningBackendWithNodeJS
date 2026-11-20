import express from "express";
import type { Express } from "express";

export function createExpresApp(): Express {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  return app;
}