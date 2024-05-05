const { validationResult } = require('express-validator');
const response = require('../helpers/response');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map((err) => ({ field: err.path, message: err.msg }));
  response.badRequest(req, res, extractedErrors)
};

module.exports = validationMiddleware;