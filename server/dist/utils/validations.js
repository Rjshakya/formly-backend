import z from "zod";
import ApiError from "./apiError.js";
import { createInsertSchema } from "drizzle-zod";
import { formFieldTable } from "../db/schema/formfields.js";
import { formTable } from "../db/schema/forms.js";
import { respondentTable } from "../db/schema/respondents.js";
import { responsesTable } from "../db/schema/responses.js";
import { workspaceTable } from "../db/schema/workspace.js";
import { user } from "../db/schema/auth-schema.js";
var source = /* @__PURE__ */ ((source2) => {
  source2["body"] = "body";
  source2["params"] = "params";
  source2["query"] = "query";
  return source2;
})(source || {});
const userObject = createInsertSchema(user);
const workspaceObject = createInsertSchema(workspaceTable);
const formObject = createInsertSchema(formTable);
const formFieldObject = createInsertSchema(formFieldTable);
const respondentObject = createInsertSchema(respondentTable);
const responseObject = createInsertSchema(responsesTable);
const multipleFormFieldObject = z.array(formFieldObject);
const multipleResponseObject = z.array(responseObject);
const updateMultipleFieldObject = z.object({
  formId: z.string().nonempty(),
  fields: multipleFormFieldObject
});
const googleSheetObject = z.object({
  userId: z.string().nonempty(),
  formId: z.string().nonempty(),
  sheetName: z.string().optional()
});
const integrationObject = z.object({
  userId: z.string().nonempty()
});
const syncGoogleSheetObject = z.object({
  formId: z.string().nonempty(),
  spreadsheetId: z.string().nonempty()
});
const deleteMultipleRespondentsObject = z.array(z.string());
const getAccessTokenObject = z.object({
  userId: z.string().nonempty().nonoptional()
});
const validationMiddleware = (schema, source2) => {
  return (req, res, next) => {
    try {
      schema.parse(req[source2]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(
          error?.issues.map((iss) => `${iss.path.join(" ")} : ${iss.message}`).join(" "),
          400,
          JSON.parse(error.message)
        );
      } else {
        next(error);
      }
    }
  };
};
export {
  deleteMultipleRespondentsObject,
  formFieldObject,
  formObject,
  getAccessTokenObject,
  googleSheetObject,
  integrationObject,
  multipleFormFieldObject,
  multipleResponseObject,
  respondentObject,
  responseObject,
  source,
  syncGoogleSheetObject,
  updateMultipleFieldObject,
  userObject,
  validationMiddleware,
  workspaceObject
};
