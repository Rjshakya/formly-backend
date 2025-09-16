import {
  createFormFieldService,
  createMultipleFormFieldService,
  deleteFormFieldService,
  getFormFieldsService,
  updateFormFieldsService,
} from "../services/formField.services";
import asyncHandler from "../utils/asynHandler";
import logger from "../utils/logger";

export const createFormField = asyncHandler(async (req, res) => {
  const formField = await createFormFieldService(req?.body);
  res.status(201).json({
    message: "ok",
    formField,
  });
});

export const getFormFields = asyncHandler(async (req, res) => {
  const formFields = await getFormFieldsService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    formFields,
  });
});

export const postMultipleFormFields = asyncHandler(async (req, res) => {
  await createMultipleFormFieldService(req?.body);
  res?.status(201).json({
    message: "ok",
    formFields: true,
  });

  return;
});

export const deleteFormField = asyncHandler(async (req, res) => {
  const formField = await deleteFormFieldService(req?.params?.formFieldId);
  res.status(200).json({
    message: "ok",
    formField,
  });
});

export const updateFormFields = asyncHandler(async (req, res) => {
  const update = await updateFormFieldsService(req?.body);
  res?.status(200)?.json({
    message: "ok",
    fields: update,
  });

  return;
});
