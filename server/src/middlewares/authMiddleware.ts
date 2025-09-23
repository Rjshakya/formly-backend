import { RequestHandler, Request } from "express";
import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import ApiError, { errorTypes } from "../utils/apiError.js";

export interface extendedRequest extends Request {
  userId?: string;
  accountId?: string;
}

export const authMiddleWare: RequestHandler = async (
  req: extendedRequest,
  res,
  next
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req?.headers),
    });

    if (session?.session?.id) {
      req.userId = session?.user?.id;

      next();
    } else {
      throw new ApiError("Unauthorised", 401, errorTypes.UNAUTHORISED);
    }
  } catch (error) {
    next(error);
  }
};
