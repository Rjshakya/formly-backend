import {
  createMultipleResponsesService,
  createResponseService,
  editResponseService,
  getFormResponsesService,
} from "../services/responses.services.js";
import asyncHandler from "../utils/asynHandler.js";

export const postFormResponse = asyncHandler(async (req, res) => {
  const response = await createResponseService(req?.body);
  res.status(201).json({
    message: "ok",
    response,
  });
});

export const postMultipleResponse = asyncHandler(async (req, res) => {
  const responses = await createMultipleResponsesService(req?.body);
  res.status(200).json({
    message: "ok",
    responses,
  });
});

export const getFormResponses = asyncHandler(async (req, res) => {
  const pageIndex = Math.max(0, parseInt(req?.query?.pageIndex as string));
  const pageSize = Math.max(1, parseInt(req?.query?.pageSize as string));

  console.log(pageIndex, pageSize);

  const responses = await getFormResponsesService(
    req?.params?.formId,
    pageIndex,
    pageSize
  );
  res.status(200).json({
    message: "ok",
    responses,
  });
});

export const editFormResponses = asyncHandler(async (req, res) => {
   const response = await editResponseService(req?.body?.responseId, req?.body?.values)
  res.status(200).json({
    message:"ok",
    response
  })
});
