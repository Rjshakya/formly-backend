import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware";
import {
  source,
  syncGoogleSheetObject,
  validationMiddleware,
} from "../utils/validations";
import { syncGoogleSheetController } from "../controllers/sync.controller";

export const syncRouter = express.Router();

syncRouter.get(
  "/google-sheet/:formId/:spreadsheetId",
  authMiddleWare,
  validationMiddleware(syncGoogleSheetObject, source.params),
  syncGoogleSheetController
);
