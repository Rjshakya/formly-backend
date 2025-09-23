const asyncHandler = (cb) => {
  return (req, res, next) => Promise.resolve(cb(req, res, next)).catch((e) => next(e));
};
var asynHandler_default = asyncHandler;
export {
  asynHandler_default as default
};
