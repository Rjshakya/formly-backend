import { Response } from "express";

export enum errorTypes {
  BAD_REQUEST = "Bad request",
  NOT_FOUND = "Not found",
  UNAUTHORISED = "unauthorised",
  FORBIDDEN = "forbidden",
  INTERNAL = "internal",
  TOKEN_EXPIRED = "token expired",
  BAD_TOKEN = "bad token",
  ACCESS_TOKEN_ERROR = "access token error",
}

class ApiError extends Error {
  message: string;
  status: number;
  type: errorTypes;

  constructor(message: string, status: number, type: errorTypes) {
    super(message);
    this.message = message;
    this.status = status;
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }

  
}

export default ApiError;
