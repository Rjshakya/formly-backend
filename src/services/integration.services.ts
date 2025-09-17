import { DrizzleError, eq } from "drizzle-orm";
import db from "../db/config";

import ApiError, { errorTypes } from "../utils/apiError";
import logger from "../utils/logger";
import {
  googleSheetsIntegrationTable,
  integrationTable,
} from "../db/schema/integrations";

const commonCatch = (error: unknown) => {
  logger.error(error);

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
    commonCatch(error);
  }
};

export const getIntegrationsOfFormService = async (formId: string) => {
  try {
    const res = await db
      .select({
        integrationId: integrationTable.id,
        sheets: {
          spreadSheetId: googleSheetsIntegrationTable.spreadSheet_id,
          spreadSheetUrl: googleSheetsIntegrationTable.spreadSheet_url,
        },
      })
      .from(integrationTable)
      .where(eq(integrationTable.formId, formId))
      .innerJoin(
        googleSheetsIntegrationTable,
        eq(googleSheetsIntegrationTable.integationId, integrationTable.id)
      );

    return res;
  } catch (error) {
    commonCatch(error);
  }
};
