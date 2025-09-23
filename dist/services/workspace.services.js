import db from "../db/config.js";
import { workspaceTable } from "../db/schema/workspace.js";
import ApiError, { errorTypes } from "../utils/apiError.js";
import { eq } from "drizzle-orm";
import { commonCatch } from "../utils/error.js";
import { formTable } from "../db/schema/forms.js";
const createWorkspaceService = async (workspaceValues) => {
  try {
    const workspace = await db.insert(workspaceTable).values(workspaceValues).returning({
      id: workspaceTable.id,
      name: workspaceTable.name,
      owner: workspaceTable.owner
    });
    return workspace[0];
  } catch (error) {
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
};
const getOwnerWorkspaceService = async (owner) => {
  try {
    const workspace = await db.select().from(workspaceTable).where(eq(workspaceTable.owner, owner));
    return workspace;
  } catch (error) {
    throw new ApiError("internal error -s", 500, errorTypes.INTERNAL);
  }
};
const getWorkspacesWithFormsService = async (userId) => {
  try {
    const res = await db.select({
      id: workspaceTable.id,
      name: workspaceTable.name,
      createdAt: workspaceTable.createdAt,
      forms: {
        id: formTable.shortId,
        name: formTable.name
      }
    }).from(workspaceTable).where(eq(workspaceTable.owner, userId)).innerJoin(formTable, eq(formTable.workspace, workspaceTable.id));
    const res1 = await db.query.workspaceTable.findMany({
      where: eq(workspaceTable.owner, userId),
      with: {
        forms: true
      }
    });
    return res1;
  } catch (e) {
    console.log(e);
    commonCatch(e);
  }
};
const deleteWorkspaceService = async (workspaceId) => {
  try {
    const deleted = await db.delete(workspaceTable).where(eq(workspaceTable.id, workspaceId)).returning({ id: workspaceTable.id });
    return deleted[0];
  } catch (error) {
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
};
export {
  createWorkspaceService,
  deleteWorkspaceService,
  getOwnerWorkspaceService,
  getWorkspacesWithFormsService
};
