import express from "express";
import { googleSheetController } from "../controllers/integrations/google.sheets.controller.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  googleSheetObject,
  integrationObject,
  source,
  validationMiddleware,
} from "../utils/validations.js";
import { getUserIntegrations } from "../controllers/integrations.controller.js";

export const integrationRouter = express.Router();

integrationRouter.post(
  "/google-sheet",
  authMiddleWare,
  validationMiddleware(googleSheetObject, source.body),
  googleSheetController
);

integrationRouter.get(
  "/:userId",
  authMiddleWare,
  validationMiddleware(integrationObject, source.params),
  getUserIntegrations
);
