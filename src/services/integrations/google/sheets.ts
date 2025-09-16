import { eq } from "drizzle-orm";
import db from "../../../db/config";
import { account } from "../../../db/schema/auth-schema";
import ApiError, { errorTypes } from "../../../utils/apiError";
import { auth } from "../../../utils/auth";
import { GoogleService } from "./google.services";
import formTable from "../../../db/schema/forms";
import { createNewIntegration } from "../../integration.services";
import logger from "../../../utils/logger";
import integrationTable from "../../../db/schema/integrations";

export const sheetsServices = async (
  userId: string,
  formId?: string,
  sheetName?: string
) => {
  try {
    const _account = await db
      .select({
        scope: account.scope,
        accessToken: account.accessToken,
      })
      .from(account)
      .where(eq(account.userId, userId));

    const form = await db
      .select({
        name: formTable.name,
      })
      .from(formTable)
      .where(eq(formTable.shortId, formId!));

    const { accessToken } = _account[0];
    const googleClient = new GoogleService(accessToken!);
    const sheet = await googleClient.createSpreadSheets(
      sheetName || form[0]?.name
    );
    const { spreadsheetId, spreadsheetUrl } = sheet!.data;

    await createNewIntegration({
      provider: "google",
      userId,
      app: "sheets",
      spreadsheetId,
      spreadsheetUrl,
      form: formId,
    });

    return { spreadsheetId, spreadsheetUrl };
  } catch (error) {
    logger.error(JSON.stringify(error));
    throw new ApiError(JSON.stringify(error), 400, errorTypes.BAD_REQUEST);
  }
};

export const getIntegrationsService = async (userId: string) => {
  try {
    const integrations = await db
      .select()
      .from(integrationTable)
      .where(eq(integrationTable.userId, userId));

    return integrations;
  } catch (e) {
    throw new ApiError(JSON.stringify(e), 500, errorTypes.INTERNAL);
  }
};
