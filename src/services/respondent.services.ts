import { eq } from "drizzle-orm";
import db from "../db/config.js";
import {respondentTable} from "../db/schema/respondents.js";
import {responsesTable} from "../db/schema/responses.js";
import {formTable} from "../db/schema/forms.js";
import {formFieldTable} from "../db/schema/formfields.js";
import { commonCatch } from "../utils/error.js";



export const createRespondentService = async (
  respondentValues: typeof respondentTable.$inferInsert
) => {
  try {
    const respondent = await db
      .insert(respondentTable)
      .values(respondentValues)
      .returning({ id: respondentTable.id });
    return respondent[0];
  } catch (e) {
    commonCatch(e);
  }
};

export const getRespondentbyIdService = async (
  id: typeof respondentTable.$inferInsert.id
) => {
  try {
    const respondent = await db
      .select()
      .from(respondentTable)
      .where(eq(respondentTable.id, id!));

    return respondent[0];
  } catch (e) {
    commonCatch(e);
  }
};

export const getFormRespondentsService = async (
  formId: typeof respondentTable.$inferInsert.form
) => {
  try {
    const respondents = await db
      .select()
      .from(respondentTable)
      .where(eq(respondentTable.form, formId));

    return respondents;
  } catch (e) {
    commonCatch(e);
  }
};

export const getFormResponsesByRespondentService = async (
  respondentId: string
) => {
  try {
    const res = await db
      .select({
        field: { ...formFieldTable },
        fieldValue: responsesTable.value,
        formId: formTable.shortId,
        formName: formTable.name,
        respondentId: responsesTable.respondent,
      })
      .from(responsesTable)
      .where(eq(responsesTable.respondent, respondentId))
      .leftJoin(formTable, eq(responsesTable.form, formTable.shortId))
      .leftJoin(
        formFieldTable,
        eq(responsesTable.form_field, formFieldTable.id)
      );

    return res;
  } catch (e) {
    commonCatch(e);
  }
};

export const deleteRespondentService = async (respondentId: string) => {
  try {
    await db
      .delete(respondentTable)
      .where(eq(respondentTable.id, respondentId));

    return true;
  } catch (e) {
    commonCatch(e);
  }
};

export const deleteMultipleRespondentService = async (
  respondents: string[]
) => {
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
