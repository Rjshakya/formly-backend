import { NextFunction, Request, Response } from "express";
import z, { ZodSchema } from "zod";
import ApiError from "./apiError.js";
import {  createInsertSchema } from "drizzle-zod";
import {formFieldTable} from "../db/schema/formfields.js";
import {formTable} from "../db/schema/forms.js";
import {respondentTable} from "../db/schema/respondents.js";
import {responsesTable} from "../db/schema/responses.js";
import {workspaceTable} from "../db/schema/workspace.js";
import { user } from "../db/schema/auth-schema.js";

export enum source {
  body = "body",
  params = "params",
  query = "query",
}

export const userObject = createInsertSchema(user);
export const workspaceObject = createInsertSchema(workspaceTable);
export const formObject = createInsertSchema(formTable);
export const formFieldObject = createInsertSchema(formFieldTable);
export const respondentObject = createInsertSchema(respondentTable);
export const responseObject = createInsertSchema(responsesTable);
export const multipleFormFieldObject = z.array(formFieldObject);
export const multipleResponseObject = z.array(responseObject);

export const updateMultipleFieldObject = z.object({
  formId: z.string().nonempty(),
  fields: multipleFormFieldObject,
});

export const googleSheetObject = z.object({
  userId: z.string().nonempty(),
  formId: z.string().nonempty(),
  sheetName: z.string().optional(),
});

export const integrationObject = z.object({
  userId: z.string().nonempty(),
});

export const syncGoogleSheetObject = z.object({
  formId: z.string().nonempty(),
  spreadsheetId: z.string().nonempty(),
});

export const deleteMultipleRespondentsObject = z.array(z.string());

export const getAccessTokenObject = z.object({
  userId: z.string().nonempty().nonoptional(),
});

export const validationMiddleware = (schema: ZodSchema, source: source) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(
          error?.issues
            .map((iss) => `${iss.path.join(" ")} : ${iss.message}`)
            .join(" "),
          400,
          JSON.parse(error.message)
        );
      } else {
        next(error);
      }
    }
  };
};
