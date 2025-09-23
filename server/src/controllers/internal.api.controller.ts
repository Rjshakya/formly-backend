import { accessToken } from "../services/internal.services.js";
import asyncHandler from "../utils/asynHandler.js";

export const getAccessTokenController = asyncHandler(async (req, res) => {
  const { userId } = req?.params;

  const result = await accessToken(userId);
  res.status(200).json({
    access_token: result,
  });
});
