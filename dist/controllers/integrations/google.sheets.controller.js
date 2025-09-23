import { sheetsServices } from "../../services/integrations/google/sheets.js";
import ApiError, { errorTypes } from "../../utils/apiError.js";
import asyncHandler from "../../utils/asynHandler.js";
import logger from "../../utils/logger.js";
const googleSheetController = asyncHandler(async (req, res) => {
  try {
    const { userId, formId, sheetName } = req?.body;
    const sheet = await sheetsServices(userId, formId, sheetName);
    res.status(200).json({
      message: "ok",
      sheet
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    throw new ApiError("internal error", 500, errorTypes.INTERNAL);
  }
});
export {
  googleSheetController
};
