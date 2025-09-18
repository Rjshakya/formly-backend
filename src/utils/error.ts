import { DrizzleError } from "drizzle-orm";
import logger from "./logger";
import ApiError, { errorTypes } from "./apiError";

export const commonCatch = (error: unknown) => {
  logger.error(error);

  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }

  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};
