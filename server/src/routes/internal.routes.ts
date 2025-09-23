import express from "express";
import {
  getAccessTokenObject,
  source,
  validationMiddleware,
} from "../utils/validations.js";
import { getAccessTokenController } from "../controllers/internal.api.controller.js";

export const internalRouter = express.Router();

internalRouter.get(
  "/access-token/:userId",
  validationMiddleware(getAccessTokenObject, source.params),
  getAccessTokenController
);
