import { and, DrizzleError, eq } from "drizzle-orm";
import db from "../db/config";
import formFieldTable from "../db/schema/formfields";
import ApiError, { errorTypes } from "../utils/apiError";
import formTable from "../db/schema/forms";
import logger from "../utils/logger";
const commonCatch = (error: unknown) => {
  logger.error(error);

  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }

  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};

export const createFormFieldService = async (
  formFieldvalues: typeof formFieldTable.$inferInsert
) => {
  try {
    const ff = await db
      .select()
      .from(formFieldTable)
      .where(
        and(
          eq(formFieldTable.form, formFieldvalues?.form),
          eq(formFieldTable.order, formFieldvalues?.order!)
        )
      );

    if (ff[0]?.id) {
      throw new ApiError(
        "form field with same order exist, please change order",
        400,
        errorTypes.BAD_REQUEST
      );
    }

    const formField = await db
      .insert(formFieldTable)
      .values(formFieldvalues)
      .returning();
    return formField[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const createMultipleFormFieldService = async (
  multipleFormFields: (typeof formFieldTable.$inferInsert)[]
) => {
  try {
    const res = await db.insert(formFieldTable).values(multipleFormFields);

    return res;
  } catch (error) {
    commonCatch(error);
  }
};

export const getFormFieldsService = async (
  formId: typeof formFieldTable.$inferSelect.form
) => {
  try {
    const formFields = await db
      .select()
      .from(formFieldTable)
      .where(eq(formFieldTable.form, formId));

    return formFields;
  } catch (error) {
    commonCatch(error);
  }
};

export const deleteFormFieldService = async (formFieldId: string) => {
  try {
    const formField = await db
      .delete(formFieldTable)
      .where(eq(formFieldTable?.id, formFieldId))
      .returning({ id: formFieldTable.id });
    return formField[0];
  } catch (error) {
    commonCatch(error);
  }
};

export const updateFormFieldsService = async ({
  formId,
  fields,
}: {
  formId: string;
  fields: (typeof formFieldTable.$inferInsert)[];
}) => {
  try {
    await db.transaction(async (tx) => {
      for (const field of fields) {
        if (!field?.id) {
          tx.rollback();
        }

        const existingField = await tx
          .select({ id: formFieldTable.id })
          .from(formFieldTable)
          .where(eq(formFieldTable.id, field?.id!));

        // if exist then update other wise insert new.
        if (existingField[0]?.id) {
          await tx
            .update(formFieldTable)
            .set({ ...field, updatedAt: new Date() })
            .where(eq(formFieldTable.id, field?.id!));
        }

        if (existingField.length === 0) {
          await tx?.insert(formFieldTable).values(field);
        }
      }

      const fieldsinDb = await tx
        .select({ id: formFieldTable?.id })
        .from(formFieldTable)
        .where(eq(formFieldTable.form, formId));

      for (const fieldinDb of fieldsinDb) {
        const isFieldInDBexistInFields = fields.some(
          (f) => f?.id === fieldinDb.id
        );

        if (!isFieldInDBexistInFields) {
          await tx
            .delete(formFieldTable)
            .where(eq(formFieldTable.id, fieldinDb?.id));
        }
      }

    });

    // await db.transaction(async (tx) => {
    //   const fieldsinDb = await tx
    //     .select({ id: formFieldTable?.id })
    //     .from(formFieldTable)
    //     .where(eq(formFieldTable.form, formId));

    //   for (const fieldinDb of fieldsinDb) {
    //     const isFieldInDBexistInFields = fields.some((f) => f?.id === fieldinDb.id);

    //     if (!isFieldInDBexistInFields) {
    //       await tx
    //         .delete(formFieldTable)
    //         .where(eq(formFieldTable.id, fieldinDb?.id));
    //     }
    //   }

    //   await tx
    //     .update(formTable)
    //     .set({ form_schema: form_schema })
    //     .where(eq(formTable?.shortId, formId));
    // });
  } catch (error) {
    commonCatch(error);
  }
};
