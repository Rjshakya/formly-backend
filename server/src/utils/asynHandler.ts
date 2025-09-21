import { NextFunction, Request, RequestHandler, Response } from "express";

interface extendedRequest extends Request {
  userId?: string;
}

type ExtendedRequestHandler = (
  req: extendedRequest,
  res: Response,
  next: NextFunction
) => any;

const asyncHandler = (cb: ExtendedRequestHandler) => {
  return (req: extendedRequest, res: Response, next: NextFunction) =>
    Promise.resolve(cb(req, res, next)).catch((e) => next(e));
};

export default asyncHandler;
