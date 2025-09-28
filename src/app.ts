import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import ApiError from "./utils/apiError.js";
import { logger } from "better-auth";
// import workspaceRouter from "./routes/workspace.routes.js";
// import formRouter from "./routes/form.routes.js";
// import formFieldsRouter from "./routes/formField.routes.js";
// import respondentRouter from "./routes/respondent.routes.js";
// import responsesRouter from "./routes/response.routes.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import cors from "cors";
import db from "./db/config.js";
import { apiRouter } from "./routes/index.js";

export const app: express.Application = express();
const trusted_url = process.env.FRONTEND_URL
app.use(
  cors({
    origin: [trusted_url],
    credentials: true,
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json({ limit: "10kb", inflate: true }));
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  res.json({
    message: "Formly server",
  });
});

app.get("/health", async (req: Request, res: Response) => {
  const {rows} = await db.execute(`SELECT version()`)
  res.status(200).json({
    message: "server is up and running",
    rows
    // db: dbRes?.rows?.length !== 0,
    // time: dbRes?.rows?.[0]?.now,
  });
});

// app.use("/api/workspace", workspaceRouter);
// app.use("/api/form", formRouter);
// app.use("/api/formField", formFieldsRouter);
// app.use("/api/respondent", respondentRouter);
// app.use("/api/response", responsesRouter);
// app.use("/api/integrations", integrationRouter);

app.use("/api", apiRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    logger.error(err.message);
    process.env.NODE_ENV === "development" && logger.error(`${err.stack}`);
    return res.status(err.status || 500).json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err?.stack : null,
      type: err.type,
    });
  }

  logger.error(`${err}`);
  process.env.NODE_ENV === "development" && logger.error(`${err.stack}`);
  return res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err?.stack : null,
    type: err?.name,
  });
});
