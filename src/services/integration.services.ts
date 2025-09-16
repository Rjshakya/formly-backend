import { DrizzleError, eq } from "drizzle-orm";
import db from "../db/config";
import integrationTable from "../db/schema/integrations";
import ApiError, { errorTypes } from "../utils/apiError";
import logger from "../utils/logger";

const commonCatch = (error: unknown) => {
  logger.error(error)

  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }

  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};

export const createNewIntegration = async (
  values: typeof integrationTable.$inferInsert
) => {
  try {
    await db.insert(integrationTable).values(values);
  } catch (error) {
    commonCatch(error)
  }
};

export const getUserIntegrationsService = async (userId: string) => {
  try {
    const res = await db
      .select({
        id: integrationTable.id,
        app: integrationTable.app,
        provider: integrationTable.provider,
        spreadSheetUrl: integrationTable.spreadsheetUrl,
        spreadSheetId:integrationTable.spreadsheetId
      })
      .from(integrationTable)
      .where(eq(integrationTable.userId, userId));

      
    return res;
  } catch (error) {
    commonCatch(error)
  }
};
