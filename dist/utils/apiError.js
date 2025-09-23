var errorTypes = /* @__PURE__ */ ((errorTypes2) => {
  errorTypes2["BAD_REQUEST"] = "Bad request";
  errorTypes2["NOT_FOUND"] = "Not found";
  errorTypes2["UNAUTHORISED"] = "unauthorised";
  errorTypes2["FORBIDDEN"] = "forbidden";
  errorTypes2["INTERNAL"] = "internal";
  errorTypes2["TOKEN_EXPIRED"] = "token expired";
  errorTypes2["BAD_TOKEN"] = "bad token";
  errorTypes2["ACCESS_TOKEN_ERROR"] = "access token error";
  return errorTypes2;
})(errorTypes || {});
class ApiError extends Error {
  message;
  status;
  type;
  constructor(message, status, type) {
    super(message);
    this.message = message;
    this.status = status;
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }
}
var apiError_default = ApiError;
export {
  apiError_default as default,
  errorTypes
};
