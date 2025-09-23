import { and, DrizzleError, eq } from "drizzle-orm";
import db from "../db/config.js";
import { formFieldTable } from "../db/schema/formfields.js";
import ApiError, { errorTypes } from "../utils/apiError.js";
import logger from "../utils/logger.js";
const commonCatch = (error) => {
  logger.error(error);
  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }
  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};
const createFormFieldService = async (formFieldvalues) => {
  try {
    const ff = await db.select().from(formFieldTable).where(
      and(
        eq(formFieldTable.form, formFieldvalues?.form),
        eq(formFieldTable.order, formFieldvalues?.order)
      )
    );
    if (ff[0]?.id) {
      throw new ApiError(
        "form field with same order exist, please change order",
        400,
        errorTypes.BAD_REQUEST
      );
    }
    const formField = await db.insert(formFieldTable).values(formFieldvalues).returning();
    return formField[0];
  } catch (error) {
    commonCatch(error);
  }
};
const createMultipleFormFieldService = async (multipleFormFields) => {
  try {
    const res = await db.insert(formFieldTable).values(multipleFormFields);
    return res;
  } catch (error) {
    commonCatch(error);
  }
};
const getFormFieldsService = async (formId) => {
  try {
    const formFields = await db.select().from(formFieldTable).where(eq(formFieldTable.form, formId));
    return formFields;
  } catch (error) {
    commonCatch(error);
  }
};
const deleteFormFieldService = async (formFieldId) => {
  try {
    const formField = await db.delete(formFieldTable).where(eq(formFieldTable?.id, formFieldId)).returning({ id: formFieldTable.id });
    return formField[0];
  } catch (error) {
    commonCatch(error);
  }
};
const updateFormFieldsService = async ({
  formId,
  fields
}) => {
  try {
    await db.transaction(async (tx) => {
      for (const field of fields) {
        if (!field?.id) {
          tx.rollback();
        }
        const existingField = await tx.select({ id: formFieldTable.id }).from(formFieldTable).where(eq(formFieldTable.id, field?.id));
        if (existingField[0]?.id) {
          await tx.update(formFieldTable).set({ ...field, updatedAt: /* @__PURE__ */ new Date() }).where(eq(formFieldTable.id, field?.id));
        }
        if (existingField.length === 0) {
          await tx?.insert(formFieldTable).values(field);
        }
      }
      const fieldsinDb = await tx.select({ id: formFieldTable?.id }).from(formFieldTable).where(eq(formFieldTable.form, formId));
      for (const fieldinDb of fieldsinDb) {
        const isFieldInDBexistInFields = fields.some(
          (f) => f?.id === fieldinDb.id
        );
        if (!isFieldInDBexistInFields) {
          await tx.delete(formFieldTable).where(eq(formFieldTable.id, fieldinDb?.id));
        }
      }
    });
  } catch (error) {
    commonCatch(error);
  }
};
export {
  createFormFieldService,
  createMultipleFormFieldService,
  deleteFormFieldService,
  getFormFieldsService,
  updateFormFieldsService
};
