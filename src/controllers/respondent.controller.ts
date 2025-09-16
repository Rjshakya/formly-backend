import {
  createRespondentService,
  deleteMultipleRespondentService,
  getFormRespondentsService,
  getFormResponsesByRespondentService,
} from "../services/respondent.services";
import asyncHandler from "../utils/asynHandler";

export const createRespondent = asyncHandler(async (req, res) => {
  const respondent = await createRespondentService(req?.body);
  res.status(200).json({
    message: "ok",
    respondent,
  });
});

export const getFormRespondent = asyncHandler(async (req, res) => {
  const respondent = await getFormRespondentsService(req?.params?.formId);
  res?.status(200).json({
    message: "ok",
    respondent,
  });
});

export const getFromResponsesByRespondent = asyncHandler(async (req, res) => {
  const responses = await getFormResponsesByRespondentService(
    req?.params?.respondentId
  );
  res.status(200).json({
    message: "ok",
    responses,
  });
});

export const deleteMultipleRespondents = asyncHandler(async(req , res) => {
  
  const result = await deleteMultipleRespondentService(req?.body)
  res.status(200).json({
    message : "ok",
    result
  })

})