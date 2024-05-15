const { param, body } = require("express-validator");
const { validStatusValues } = require("../constant");
const { validateObjectId } = require("../helpers/mongoose");

const todoRules = {
  create: [
    body("subject")
      .exists()
      .withMessage("subject is required")
      .bail() // Stop validation if there is an error
      .trim()
      .notEmpty()
      .withMessage("subject cannot be empty")
      .bail()
      .isString()
      .withMessage("subject must be a string"),
    body("description")
      .exists()
      .withMessage("description is required")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("description cannot be empty")
      .bail()
      .isString()
      .withMessage("description must be a string"),
  ],
  getAll: [],
  getByID: [
    param("id")
      .exists()
      .withMessage("parameter id is required")
      .bail()
      .custom((value) => validateObjectId(value))
      .withMessage("parameter id is not valid"),
  ],
  updateByID: [
    param("id")
      .exists()
      .withMessage("parameter id is required")
      .bail()
      .custom((value) => validateObjectId(value))
      .withMessage("parameter id is not valid"),
    body("subject").optional(),
    body("description").optional(),
    body("status")
      .optional()
      .isIn(validStatusValues)
      .withMessage(`Status must be one of: ${validStatusValues.join(", ")}`),
  ],
  deleteByID: [
    param("id")
      .exists()
      .withMessage("parameter id is required")
      .bail()
      .custom((value) => validateObjectId(value))
      .withMessage("parameter id is not valid"),
  ],
};

module.exports = todoRules;
