import { and, eq } from "drizzle-orm";
import db from "../db/config";
import {formFieldTable} from "../db/schema/formfields";
import ApiError, { errorTypes } from "../utils/apiError";
import logger from "../utils/logger";

import { syncFlow } from "../queue/googleSheet";

export const syncGoogleSheetService = async (
  formId: string,
  userId: string,
  spreadsheetId: string
) => {
  try {
    const formfields = await db
      .select({
        name: formFieldTable.label,
      })
      .from(formFieldTable)
      .where(eq(formFieldTable.form, formId))
      .orderBy(formFieldTable.order);

    const heads = formfields?.map((f) => f?.name)?.flat();

    // await syncQueue.add("syncData", { formId  , heads , userId , spreadsheetId});
    await syncFlow.add({
      name: "syncDataforSheets",
      queueName: "googleSheetQueue",
      children: [
        {
          name: "syncData",
          queueName: "syncQueue",
          data: { formId, heads, userId, spreadsheetId },
        },
      ],
    });

    return;
  } catch (e) {
    logger.error(JSON.stringify(e));
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
};
