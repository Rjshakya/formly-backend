// import { eq } from "drizzle-orm";
// import db from "../../../db/config.js";
// import { account } from "../../../db/schema/auth-schema.js";
// import ApiError, { errorTypes } from "../../../utils/apiError.js";
// import { GoogleService } from "./google.services.js";
// import { formTable } from "../../../db/schema/forms.js";
// import logger from "../../../utils/logger.js";

// export const sheetsServices = async (
//   userId: string,
//   formId?: string,
//   sheetName?: string
// ) => {
//   try {
//     const _account = await db
//       .select({
//         scope: account.scope,
//         accessToken: account.accessToken,
//       })
//       .from(account)
//       .where(eq(account.userId, userId));

//     const form = await db
//       .select({
//         name: formTable.name,
//       })
//       .from(formTable)
//       .where(eq(formTable.shortId, formId!));

//     const { accessToken } = _account[0];
//     const googleClient = new GoogleService(accessToken!);
//     const sheet = await googleClient.createSpreadSheets(
//       sheetName || form[0]?.name
//     );
//     const { spreadsheetId, spreadsheetUrl } = sheet!.data;

//     return { spreadsheetId, spreadsheetUrl };
//   } catch (error) {
//     logger.error(JSON.stringify(error));
//     throw new ApiError(JSON.stringify(error), 400, errorTypes.BAD_REQUEST);
//   }
// };
