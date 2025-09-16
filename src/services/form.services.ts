import { and, asc, DrizzleError, eq } from "drizzle-orm";
import db from "../db/config";
import formTable from "../db/schema/forms";
import ApiError, { errorTypes } from "../utils/apiError";
import { user } from "../db/schema/auth-schema";
import formFieldTable from "../db/schema/formfields";
import logger from "../utils/logger";

export const createFormService = async (
  formValues: typeof formTable.$inferInsert
) => {
  try {
    const form = await db.insert(formTable).values(formValues).returning();

    return form[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const getWorkspaceFormService = async (
  workspace: typeof formTable.$inferInsert.workspace
) => {
  try {
    const forms = await db
      .select({
        id: formTable.id,
        name: formTable.name,
        shortId: formTable.shortId,
      })
      .from(formTable)
      .where(and(eq(formTable.workspace, workspace!)));
    return forms;
  } catch (error) {
    commonCatch(error);
  }
};

export const getUserFormsService = async (
  userId: typeof user.$inferInsert.id
) => {
  try {
    const forms = await db
      .select({
        id: formTable.id,
        name: formTable.name,
      })
      .from(formTable)
      .where(eq(formTable.creator, userId!));
    return forms;
  } catch (error) {
    commonCatch(error);
  }
};

export const deleteFormService = async (
  formId: typeof formTable.$inferInsert.shortId
) => {
  try {
    const form = await db
      .delete(formTable)
      .where(eq(formTable?.shortId, formId!))
      .returning({
        id: formTable?.id,
      });

    return form[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const updateFormIdService = async (formUpdateValues: {
  formId: typeof formTable.$inferInsert.shortId;
  formName: typeof formTable.$inferInsert.name;
  form_schema: typeof formTable.$inferInsert.form_schema;
}) => {
  try {
    const updateForm = await db
      .update(formTable)
      .set({
        name: formUpdateValues?.formName,
        form_schema: formUpdateValues.form_schema,
        updatedAt: new Date(),
      })
      .where(eq(formTable.shortId, formUpdateValues?.formId!))
      .returning({ formId: formTable.shortId });

    return updateForm[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const getFormWithFormFieldsService = async (
  formId: typeof formTable.$inferInsert.id
) => {
  try {
    const rows = await db
      .select()
      .from(formTable)
      .where(eq(formTable.shortId, formId!))
      .leftJoin(formFieldTable, eq(formTable.shortId, formFieldTable.form))
      .orderBy(asc(formFieldTable.order));

    const result = rows.reduce(
      (acc, row) => {
        if (acc?.forms?.id?.length === 0) {
          acc.forms.id = row?.forms?.id;
          acc.forms.name = row?.forms?.name;
          acc.forms.shortId = row?.forms?.shortId;
          acc.forms.form_json_schema = row?.forms?.form_schema;
        }

        if (row?.form_fields?.id) {
          acc?.form_fields?.push(row?.form_fields);
        }

        return acc;
      },
      {
        forms: { id: "", name: "", shortId: "", form_json_schema: "" },
        form_fields: [] as (typeof formFieldTable.$inferSelect)[],
      }
    );

    return result;
  } catch (error) {
    commonCatch(error);
  }
};

export const getFormService = async (
  formId: typeof formTable.$inferInsert.shortId
) => {
  try {
    const form = await db
      .select({
        id: formTable.shortId,
        name: formTable.name,
        form_schema: formTable.form_schema,
        creator: formTable.creator,
        createdAt: formTable.createdAt,
        updatedAt: formTable.updatedAt,
      })
      .from(formTable)
      .where(eq(formTable.shortId, formId));

    return { ...form[0], form_schema: JSON.parse(form[0].form_schema) };
  } catch (e) {
    commonCatch(e);
  }
};

const commonCatch = (error: unknown) => {
  logger.error(error);

  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }

  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};
