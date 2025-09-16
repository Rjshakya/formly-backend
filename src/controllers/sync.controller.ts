import { syncGoogleSheetService } from "../services/sync.services";
import asyncHandler from "../utils/asynHandler";

export const syncGoogleSheetController = asyncHandler(async (req, res) => {
  const { formId, spreadsheetId } = req?.params;
  const userId = req?.userId;

  await syncGoogleSheetService(formId, userId!, spreadsheetId);
  
  res.status(200).json({
    message: "syncing started",
  });
});
