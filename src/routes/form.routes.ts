import express from "express";
import { formObject, source, validationMiddleware } from "../utils/validations.js";
import {
  createForm,
  deleteForm,
  getForm,
  getFormWithFormField,
  getWorkspaceForms,
  updateForm,
} from "../controllers/form.controller.js";
import z from "zod";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const formRouter = express.Router();

formRouter.post(
  "/",
  authMiddleWare,
  validationMiddleware(formObject, source.body),
  createForm
);

formRouter.get(
  "/workspace/:workspace",
  authMiddleWare,
  validationMiddleware(
    z.object({
      workspace: z.string().nonempty().max(255),
    }),
    source.params
  ),
  getWorkspaceForms
);

formRouter.get(
  "/:formId",
  validationMiddleware(
    z.object({ formId: z.string().nonempty() }),
    source.params
  ),
  getForm
);

formRouter.delete(
  "/:formId",
  authMiddleWare,
  validationMiddleware(
    z.object({
      formId: z.string().nonempty(),
    }),
    source?.params
  ),
  deleteForm
);

formRouter.patch(
  "/",
  authMiddleWare,
  validationMiddleware(
    z.object({
      formId: z.string().nonempty(),
      formName: z.string().nonempty(),
      form_schema: z.string().nonempty(),
    }),
    source.body
  ),
  updateForm
);

export default formRouter;
