import {
  createWorkspaceService,
  deleteWorkspaceService,
  getOwnerWorkspaceService,
  getWorkspacesWithFormsService,
} from "../services/workspace.services.js";
import asyncHandler from "../utils/asynHandler.js";

export const createNewWorkspace = asyncHandler(async (req, res, next) => {
  const workspace = await createWorkspaceService(req?.body);
  if (workspace !== undefined) {
    res.status(201).json({
      message: "ok",
      workspace,
    });

    return;
  }
});

export const getWorkspacesByUser = asyncHandler(async (req, res) => {
  const workspace = await getOwnerWorkspaceService(req?.params?.user!);
  if (workspace) {
    res.status(200).json({
      message: "ok",
      workspace: workspace,
    });

    return;
  }
});

export const getWorkspacesWithForms = asyncHandler(async (req, res) => {
  const workspace = await getWorkspacesWithFormsService(req?.params?.userId!);
  res.status(200).json({
    message: "ok",
    workspace,
  });
});

export const deleteWorkspace = asyncHandler(async (req, res) => {
  const workspace = await deleteWorkspaceService(req?.params?.workspaceId);
  res.status(200).json({
    message: "ok",
    workspace,
  });
});
