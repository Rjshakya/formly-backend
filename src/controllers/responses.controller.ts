import { fromNodeHeaders } from "better-auth/node";
import {
  createMultipleResponsesService,
  createResponseService,
  getFormResponsesService,
} from "../services/responses.services";
import asyncHandler from "../utils/asynHandler";

export const postFormResponse = asyncHandler(async (req, res) => {
  const response = await createResponseService(req?.body);
  res.status(201).json({
    message: "ok",
    response,
  });
});

export const postMultipleResponse = asyncHandler(async (req, res) => {

  
  const responses = await createMultipleResponsesService(
    req?.body,
  
  );
  res.status(200).json({
    message: "ok",
    responses,
  });
});

export const getFormResponses = asyncHandler(async (req, res) => {
  const responses = await getFormResponsesService(req?.params?.formId);
  res.status(200).json({
    message: "ok",
    responses,
  });
});
