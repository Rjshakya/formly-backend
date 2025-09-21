import express from "express";
import { googleSheetController } from "../controllers/integrations/google.sheets.controller";
import { authMiddleWare } from "../middlewares/authMiddleware";
import {
  googleSheetObject,
  integrationObject,
  source,
  validationMiddleware,
} from "../utils/validations";
import { getUserIntegrations } from "../controllers/integrations.controller";

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
