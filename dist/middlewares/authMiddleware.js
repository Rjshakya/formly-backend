import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import ApiError, { errorTypes } from "../utils/apiError.js";
const authMiddleWare = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req?.headers)
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
export {
  authMiddleWare
};
