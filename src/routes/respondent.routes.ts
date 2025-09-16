import express from "express";
import {
  deleteMultipleRespondentsObject,
  respondentObject,
  source,
  validationMiddleware,
} from "../utils/validations";
import {
  createRespondent,
  deleteMultipleRespondents,
  getFormRespondent,
  getFromResponsesByRespondent,
} from "../controllers/respondent.controller";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware";

const respondentRouter = express.Router();

respondentRouter.post(
  "/",
  validationMiddleware(respondentObject, source.body),
  createRespondent
);

respondentRouter.get(
  "/form/:formId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      formId: z.string().nonempty(),
    }),
    source.params
  ),
  getFormRespondent
);

respondentRouter.get(
  "/:respondentId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      respondentId: z.string().nonempty(),
    }),
    source.params
  ),

  getFromResponsesByRespondent
);

respondentRouter.put(
  "/delete",
  authMiddleWare,
  validationMiddleware(deleteMultipleRespondentsObject, source.body),
  deleteMultipleRespondents
);

export default respondentRouter;
