import { DrizzleError } from "drizzle-orm";
import logger from "./logger.js";
import ApiError, { errorTypes } from "./apiError.js";
const commonCatch = (error) => {
  logger.error(error);
  if (error instanceof DrizzleError) {
    throw new ApiError(error?.message, 500, errorTypes.INTERNAL);
  }
  throw new ApiError(JSON.stringify(error), 500, errorTypes.INTERNAL);
};
export {
  commonCatch
};
