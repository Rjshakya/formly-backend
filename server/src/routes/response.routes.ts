import express from "express";
import {
  multipleResponseObject,
  responseObject,
  source,
  validationMiddleware,
} from "../utils/validations";
import {
  postFormResponse,
  getFormResponses,
  postMultipleResponse,
  editFormResponses,
} from "../controllers/responses.controller";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware";

const responsesRouter = express.Router();

responsesRouter.post(
  "/",
  validationMiddleware(responseObject, source.body),
  postFormResponse
);

responsesRouter.post(
  "/multiple",
  validationMiddleware(multipleResponseObject, source.body),
  postMultipleResponse
);

responsesRouter.get(
  "/form/:formId",
  authMiddleWare,
  validationMiddleware(
    z.object({ formId: z.string().nonempty() }),
    source.params
  ),
  getFormResponses
);

responsesRouter.put(
  "/",
  authMiddleWare,
  validationMiddleware(responseObject, source.body),
  editFormResponses
);

export default responsesRouter;
