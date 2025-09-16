import { getUserIntegrationsService } from "../services/integration.services";
import asyncHandler from "../utils/asynHandler";

export const getUserIntegrations = asyncHandler(async (req, res) => {
  // Logic to get user integrations will go here

  const integrations = await getUserIntegrationsService(req?.params?.userId);
  res.status(200).json({
    message: "ok",
    integrations,
  });

  return;
});
