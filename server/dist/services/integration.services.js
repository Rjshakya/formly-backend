import { eq } from "drizzle-orm";
import db from "../db/config.js";
import {
  googleSheetsIntegrationTable,
  integrationTable
} from "../db/schema/integrations.js";
import { commonCatch } from "../utils/error.js";
import { eventQueue } from "../queue/queues.js";
const createNewIntegration = async (values, type) => {
  try {
    let integration = await db.select().from(integrationTable).where(eq(integrationTable.formId, values.formId));
    if (integration) return integration;
    integration = await db.insert(integrationTable).values(values).returning();
    eventQueue.add("create-integration-event", {
      type,
      integration: integration[0]?.id,
      formId: values?.formId
    });
    return integration;
  } catch (error) {
    commonCatch(error);
  }
};
const getIntegrationsOfFormService = async (formId) => {
  try {
    const res = await db.select({
      integrationId: integrationTable.id,
      sheets: {
        spreadSheetId: googleSheetsIntegrationTable.spreadSheet_id,
        spreadSheetUrl: googleSheetsIntegrationTable.spreadSheet_url
      }
    }).from(integrationTable).where(eq(integrationTable.formId, formId)).innerJoin(
      googleSheetsIntegrationTable,
      eq(googleSheetsIntegrationTable.integationId, integrationTable.id)
    );
    return res;
  } catch (error) {
    commonCatch(error);
  }
};
export {
  createNewIntegration,
  getIntegrationsOfFormService
};
