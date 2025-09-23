import {
  createFormService,
  deleteFormService,
  getFormService,
  getFormWithFormFieldsService,
  getWorkspaceFormService,
  updateFormIdService
} from "../services/form.services.js";
import asyncHandler from "../utils/asynHandler.js";
const getForm = asyncHandler(async (req, res) => {
  const form = await getFormService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    form
  });
});
const createForm = asyncHandler(async (req, res) => {
  const form = await createFormService(req?.body);
  res.status(201).json({
    message: "ok",
    form
  });
});
const getWorkspaceForms = asyncHandler(async (req, res) => {
  const forms = await getWorkspaceFormService(req?.params?.workspace);
  res.status(200).json({
    message: "ok",
    forms
  });
});
const getFormWithFormField = asyncHandler(async (req, res) => {
  const form = await getFormWithFormFieldsService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    form
  });
});
const deleteForm = asyncHandler(async (req, res) => {
  const form = await deleteFormService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    form
  });
  return;
});
const updateForm = asyncHandler(async (req, res) => {
  const form = await updateFormIdService(req?.body);
  res.status(200).json({
    message: "ok",
    form
  });
});
export {
  createForm,
  deleteForm,
  getForm,
  getFormWithFormField,
  getWorkspaceForms,
  updateForm
};
