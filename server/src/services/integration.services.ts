import { DrizzleError, eq } from "drizzle-orm";
import db from "../db/config";

import ApiError, { errorTypes } from "../utils/apiError";
import logger from "../utils/logger";
import {
  googleSheetsIntegrationTable,
  integrationTable,
} from "../db/schema/integrations";
import { commonCatch } from "../utils/error";
import { eventQueue } from "../queue/queues";

export const createNewIntegration = async (
  values: typeof integrationTable.$inferInsert,
  type: string
) => {
  try {
    let integration = await db
      .select()
      .from(integrationTable)
      .where(eq(integrationTable.formId, values.formId!));

    if (integration) return integration;

    integration = await db.insert(integrationTable).values(values).returning();

    eventQueue.add("create-integration-event", {
      type,
      integration: integration[0]?.id,
      formId: values?.formId,
    });

    return integration;
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
