import {
  createFormFieldService,
  createMultipleFormFieldService,
  deleteFormFieldService,
  getFormFieldsService,
  updateFormFieldsService
} from "../services/formField.services.js";
import asyncHandler from "../utils/asynHandler.js";
const createFormField = asyncHandler(async (req, res) => {
  const formField = await createFormFieldService(req?.body);
  res.status(201).json({
    message: "ok",
    formField
  });
});
const getFormFields = asyncHandler(async (req, res) => {
  const formFields = await getFormFieldsService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    formFields
  });
});
const postMultipleFormFields = asyncHandler(async (req, res) => {
  await createMultipleFormFieldService(req?.body);
  res?.status(201).json({
    message: "ok",
    formFields: true
  });
  return;
});
const deleteFormField = asyncHandler(async (req, res) => {
  const formField = await deleteFormFieldService(req?.params?.formField);
  res.status(200).json({
    message: "ok",
    formField
  });
});
const updateFormFields = asyncHandler(async (req, res) => {
  const update = await updateFormFieldsService(req?.body);
  res?.status(200)?.json({
    message: "ok",
    fields: update
  });
  return;
});
export {
  createFormField,
  deleteFormField,
  getFormFields,
  postMultipleFormFields,
  updateFormFields
};
