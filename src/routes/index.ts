import express from "express";
import workspaceRouter from "./workspace.routes";
import formRouter from "./form.routes";
import formFieldsRouter from "./formField.routes";
import respondentRouter from "./respondent.routes";
import responsesRouter from "./response.routes";
import { integrationRouter } from "./integrations.routes";
export const apiRouter = express.Router();

apiRouter.use("/workspace", workspaceRouter);
apiRouter.use("/form", formRouter);
apiRouter.use("/formField", formFieldsRouter);
apiRouter.use("/respondent", respondentRouter);
apiRouter.use("/response", responsesRouter);
apiRouter.use("/integrations", integrationRouter);
