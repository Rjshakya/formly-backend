import { DrizzleError, eq } from "drizzle-orm";
import db from "../db/config.js";
import { respondentTable } from "../db/schema/respondents.js";
import ApiError, { errorTypes } from "../utils/apiError.js";
import logger from "../utils/logger.js";
import { responsesTable } from "../db/schema/responses.js";
import { formTable } from "../db/schema/forms.js";
import { formFieldTable } from "../db/schema/formfields.js";
const commonCatch = (error) => {
  logger.error(error);
  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }
  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};
const createRespondentService = async (respondentValues) => {
  try {
    const respondent = await db.insert(respondentTable).values(respondentValues).returning({ id: respondentTable.id });
    return respondent[0];
  } catch (e) {
    commonCatch(e);
  }
};
const getRespondentbyIdService = async (id) => {
  try {
    const respondent = await db.select().from(respondentTable).where(eq(respondentTable.id, id));
    return respondent[0];
  } catch (e) {
    commonCatch(e);
  }
};
const getFormRespondentsService = async (formId) => {
  try {
    const respondents = await db.select().from(respondentTable).where(eq(respondentTable.form, formId));
    return respondents;
  } catch (e) {
    commonCatch(e);
  }
};
const getFormResponsesByRespondentService = async (respondentId) => {
  try {
    const res = await db.select({
      field: { ...formFieldTable },
      fieldValue: responsesTable.value,
      formId: formTable.shortId,
      formName: formTable.name,
      respondentId: responsesTable.respondent
    }).from(responsesTable).where(eq(responsesTable.respondent, respondentId)).leftJoin(formTable, eq(responsesTable.form, formTable.shortId)).leftJoin(
      formFieldTable,
      eq(responsesTable.form_field, formFieldTable.id)
    );
    return res;
  } catch (e) {
    commonCatch(e);
  }
};
const deleteRespondentService = async (respondentId) => {
  try {
    await db.delete(respondentTable).where(eq(respondentTable.id, respondentId));
    return true;
  } catch (e) {
    commonCatch(e);
  }
};
const deleteMultipleRespondentService = async (respondents) => {
  try {
    if (respondents.length === 0) return;
    await db.transaction(async (tx) => {
      for (const r of respondents) {
        await tx.delete(respondentTable).where(eq(respondentTable.id, r));
      }
    });
    return true;
  } catch (e) {
    commonCatch(e);
  }
};
export {
  createRespondentService,
  deleteMultipleRespondentService,
  deleteRespondentService,
  getFormRespondentsService,
  getFormResponsesByRespondentService,
  getRespondentbyIdService
};
