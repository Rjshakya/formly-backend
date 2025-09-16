import { sheetsServices } from "../../services/integrations/google/sheets";
import ApiError from "../../utils/apiError";
import asyncHandler from "../../utils/asynHandler";
import logger from "../../utils/logger";

export const googleSheetController = asyncHandler(async (req, res) => {
  try {
    const { userId, formId, sheetName } = req?.body;
    const sheet = await sheetsServices(userId, formId, sheetName);

    res.status(200).json({
      message: "ok",
      sheet,
    });
  } catch (error) {
    logger.error(JSON.stringify(error));
    throw new ApiError("internal error", 500, "internal error");
  }
});
