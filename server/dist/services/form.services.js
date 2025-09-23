import { and, asc, eq } from "drizzle-orm";
import db from "../db/config.js";
import { formTable } from "../db/schema/forms.js";
import { formFieldTable } from "../db/schema/formfields.js";
import { commonCatch } from "../utils/error.js";
const createFormService = async (formValues) => {
  try {
    const form = await db.insert(formTable).values(formValues).returning();
    return form[0];
  } catch (error) {
    commonCatch(error);
  }
};
const getWorkspaceFormService = async (workspace) => {
  try {
    const forms = await db.select({
      id: formTable.id,
      name: formTable.name,
      shortId: formTable.shortId
    }).from(formTable).where(and(eq(formTable.workspace, workspace)));
    return forms;
  } catch (error) {
    commonCatch(error);
  }
};
const getUserFormsService = async (userId) => {
  try {
    const forms = await db.select({
      id: formTable.id,
      name: formTable.name
    }).from(formTable).where(eq(formTable.creator, userId));
    return forms;
  } catch (error) {
    commonCatch(error);
  }
};
const deleteFormService = async (formId) => {
  try {
    const form = await db.delete(formTable).where(eq(formTable?.shortId, formId)).returning({
      id: formTable?.id
    });
    return form[0];
  } catch (error) {
    commonCatch(error);
  }
};
const updateFormIdService = async (formUpdateValues) => {
  try {
    const updateForm = await db.update(formTable).set({
      name: formUpdateValues?.formName,
      form_schema: formUpdateValues.form_schema,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(formTable.shortId, formUpdateValues?.formId)).returning({ formId: formTable.shortId });
    return updateForm[0];
  } catch (error) {
    commonCatch(error);
  }
};
const getFormWithFormFieldsService = async (formId) => {
  try {
    const rows = await db.select().from(formTable).where(eq(formTable.shortId, formId)).leftJoin(formFieldTable, eq(formTable.shortId, formFieldTable.form)).orderBy(asc(formFieldTable.order));
    return rows;
  } catch (error) {
    commonCatch(error);
  }
};
const getFormService = async (formId) => {
  try {
    const form = await db.select({
      id: formTable.shortId,
      name: formTable.name,
      form_schema: formTable.form_schema,
      creator: formTable.creator,
      createdAt: formTable.createdAt,
      updatedAt: formTable.updatedAt
    }).from(formTable).where(eq(formTable.shortId, formId));
    return { ...form[0], form_schema: JSON.parse(form[0].form_schema) };
  } catch (e) {
    commonCatch(e);
  }
};
export {
  createFormService,
  deleteFormService,
  getFormService,
  getFormWithFormFieldsService,
  getUserFormsService,
  getWorkspaceFormService,
  updateFormIdService
};
