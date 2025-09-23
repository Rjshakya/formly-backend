import {
  createRespondentService,
  deleteMultipleRespondentService,
  deleteRespondentService,
  getFormRespondentsService,
  getRespondentbyIdService
} from "../services/respondent.services.js";
import asyncHandler from "../utils/asynHandler.js";
const createRespondent = asyncHandler(async (req, res) => {
  const respondent = await createRespondentService(req?.body);
  res.status(200).json({
    message: "ok",
    respondent
  });
});
const getFormRespondent = asyncHandler(async (req, res) => {
  const respondent = await getFormRespondentsService(req?.params?.formId);
  res?.status(200).json({
    message: "ok",
    respondent
  });
});
const getRespondent = asyncHandler(async (req, res) => {
  const respondent = await getRespondentbyIdService(req?.params?.respondentId);
  res.status(200).json({
    message: "ok",
    respondent
  });
});
const deleteRespondent = asyncHandler(async (req, res) => {
  const respondent = await deleteRespondentService(req?.params?.respondentId);
  res.status(200).json({
    message: "ok",
    respondent
  });
});
const deleteMultipleRespondents = asyncHandler(async (req, res) => {
  const result = await deleteMultipleRespondentService(req?.body);
  res.status(200).json({
    message: "ok",
    result
  });
});
export {
  createRespondent,
  deleteMultipleRespondents,
  deleteRespondent,
  getFormRespondent,
  getRespondent
};
