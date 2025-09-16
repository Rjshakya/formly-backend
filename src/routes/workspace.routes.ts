import express from "express";
import {
  source,
  validationMiddleware,
  workspaceObject,
} from "../utils/validations.js";
import {
  createNewWorkspace,
  deleteWorkspace,
  getWorkspacesByUser,
} from "../controllers/workspace.controller.js";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const workspaceRouter: express.Router = express.Router();

workspaceRouter.post(
  "/",
  authMiddleWare,
  validationMiddleware(workspaceObject, source.body),
  createNewWorkspace
);

workspaceRouter.get(
  "/",
  authMiddleWare,
  validationMiddleware(
    z.object({ ownerId: z.string().optional() }),
    source.params
  ),
  getWorkspacesByUser
);

workspaceRouter.delete(
  "/:workspaceId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      workspaceId: z.string().nonempty(),
    }),
    source?.params
  ),
  deleteWorkspace
);

export default workspaceRouter;
