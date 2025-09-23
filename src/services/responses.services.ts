import { count, desc, eq } from "drizzle-orm";
import db from "../db/config.js";
import { responsesTable } from "../db/schema/responses.js";
import { formFieldTable } from "../db/schema/formfields.js";
import { formTable } from "../db/schema/forms.js";
import { respondentTable } from "../db/schema/respondents.js";
import { googleSheetsQueue } from "../queue/queues.js";
import { commonCatch } from "../utils/error.js";

export const createResponseService = async (
  responseValues: typeof responsesTable.$inferInsert
) => {
  try {
    const response = await db
      .insert(responsesTable)
      .values(responseValues)
      .returning();
    return response[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const getFormResponsesService = async (
  formId: typeof responsesTable.$inferInsert.form,
  pageIndex: number,
  pageSize: number
) => {
  try {
    const respondent = await db
      .select({
        id: respondentTable.id,
        createdAt: respondentTable.createdAt,
        form: respondentTable.form,
      })
      .from(respondentTable)
      .where(eq(respondentTable.form, formId))
      .orderBy(desc(respondentTable.createdAt))
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const respondentCount = await db
      .select({ totalCount: count() })
      .from(respondentTable)
      .where(eq(respondentTable.form, formId));

    const totalPages = Math.ceil(respondentCount[0].totalCount / pageSize);

    const headers = await db
      .select({
        label: formFieldTable.label,
      })
      .from(formFieldTable)
      .where(eq(formFieldTable.form, formId))
      .orderBy(formFieldTable.updatedAt);

    headers.unshift({ label: "Time" });

    const res: any[] = [];

    for await (const r of respondent) {
      const response = await db
        .select({
          id: responsesTable.id,
          value: responsesTable.value,
          field: formFieldTable.label,
        })
        .from(responsesTable)
        .where(eq(responsesTable.respondent, r?.id))
        .leftJoin(
          formFieldTable,
          eq(formFieldTable.id, responsesTable.form_field)
        )
        .orderBy(formFieldTable.updatedAt);

      const reduce = response?.reduceRight((prev, curr) => {
        return {
          Time: { value: r?.createdAt, id: "time" },
          [curr?.field as string]: { value: curr?.value, id: curr?.id },
          ...prev,
          id: r?.id,
          form: r?.form,
        };
      }, {});

      res.push(reduce);
    }

    return {
      res,
      headers,
      pageIndex,
      pageSize,
      totalPages,
      totalCount: respondentCount[0].totalCount,
    };
  } catch (error) {
    commonCatch(error);
  }
};

export const createMultipleResponsesService = async (
  responses: (typeof responsesTable.$inferInsert)[]
) => {
  try {
    const result = await db
      .insert(responsesTable)
      .values(responses)
      .returning();

    const formId = result[0].form;

    const user = await db
      .select({
        creator: formTable.creator,
      })
      .from(formTable)
      .where(eq(formTable.shortId, formId));

    const userId = user[0].creator;

    googleSheetsQueue.add("addResponses", {
      result,
      userId,
    });
    return result;
  } catch (error) {
    commonCatch(error);
  }
};

export const editResponseService = async (
  responseId: string,
  values: typeof responsesTable.$inferInsert
) => {
  try {
    await db
      .update(responsesTable)
      .set(values)
      .where(eq(responsesTable.id, responseId));

    return true;
  } catch (e) {
    commonCatch(e);
  }
};
