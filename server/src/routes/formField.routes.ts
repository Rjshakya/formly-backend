import express from "express";
import {
  formFieldObject,
  multipleFormFieldObject,
  source,
  updateMultipleFieldObject,
  validationMiddleware,
} from "../utils/validations.js";
import {
  createFormField,
  deleteFormField,
  getFormFields,
  postMultipleFormFields,
  updateFormFields,
} from "../controllers/form.field.controller.js";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const formFieldsRouter = express.Router();

formFieldsRouter.post(
  "/",
  authMiddleWare,
  validationMiddleware(multipleFormFieldObject, source?.body),
  postMultipleFormFields
);

formFieldsRouter.get(
  "/form/:formId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      formId: z.string().nonempty().max(255),
    }),
    source.params
  ),
  getFormFields
);

formFieldsRouter.delete(
  "/:formField",
  authMiddleWare,
  validationMiddleware(
    z.object({
      formField: z.string().nonempty(),
    }),
    source?.params
  ),

  deleteFormField
);

formFieldsRouter.patch(
  "/",
  authMiddleWare,
  validationMiddleware(updateMultipleFieldObject, source.body),
  updateFormFields
);

export default formFieldsRouter;
