import express from "express";
import {
  getAccessTokenObject,
  source,
  validationMiddleware,
} from "../utils/validations";
import { getAccessTokenController } from "../controllers/internal.api.controller";

export const internalRouter = express.Router();

internalRouter.get(
  "/access-token/:userId",
  validationMiddleware(getAccessTokenObject, source.params),
  getAccessTokenController
);
