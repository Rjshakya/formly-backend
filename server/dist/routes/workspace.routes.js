import express from "express";
import {
  source,
  validationMiddleware,
  workspaceObject
} from "../utils/validations.js";
import {
  createNewWorkspace,
  deleteWorkspace,
  getWorkspacesByUser,
  getWorkspacesWithForms
} from "../controllers/workspace.controller.js";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
const workspaceRouter = express.Router();
workspaceRouter.post(
  "/",
  authMiddleWare,
  validationMiddleware(workspaceObject, source.body),
  createNewWorkspace
);
workspaceRouter.get(
  "/:user",
  authMiddleWare,
  validationMiddleware(
    z.object({ user: z.string().optional() }),
    source.params
  ),
  getWorkspacesByUser
);
workspaceRouter.get(
  `/forms/:userId`,
  authMiddleWare,
  validationMiddleware(
    z.object({ userId: z.string().nonempty() }),
    source.params
  ),
  getWorkspacesWithForms
);
workspaceRouter.delete(
  "/:workspaceId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      workspaceId: z.string().nonempty()
    }),
    source?.params
  ),
  deleteWorkspace
);
var workspace_routes_default = workspaceRouter;
export {
  workspace_routes_default as default
};
