import db from "../db/config.js";
import workspaceTable from "../db/schema/workspace.js";
import ApiError, { errorTypes } from "../utils/apiError.js";
import { eq } from "drizzle-orm";

export const createWorkspaceService = async (
  workspaceValues: typeof workspaceTable.$inferInsert
) => {
  try {
    const workspace = await db
      .insert(workspaceTable)
      .values(workspaceValues)
      .returning({
        id: workspaceTable.id,
        name: workspaceTable.name,
        owner: workspaceTable.owner,
      });

    return workspace[0];
  } catch (error) {
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
};

export const getOwnerWorkspaceService = async (
  owner: typeof workspaceTable.$inferSelect.owner
) => {
  try {
    const workspace = await db
      .select()
      .from(workspaceTable)
      .where(eq(workspaceTable.owner, owner));

    return workspace;
  } catch (error) {
    throw new ApiError("internal error -s", 500, errorTypes.INTERNAL);
  }
};

export const deleteWorkspaceService = async (
  workspaceId: typeof workspaceTable.$inferInsert.id
) => {
  try {
    const deleted = await db
      .delete(workspaceTable)
      .where(eq(workspaceTable.id, workspaceId!))
      .returning({ id: workspaceTable.id });

    return deleted[0];
  } catch (error) {
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
};
