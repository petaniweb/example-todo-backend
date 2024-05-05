const { query, body } = require("express-validator");
const { validStatusValues } = require("../constant");

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
  getByID: [],
  updateByID: [
    body("subject")
      .optional(),
    body("description")
      .optional(),
    body("status")
      .optional()
      .isIn(validStatusValues)
      .withMessage(`Status must be one of: ${validStatusValues.join(", ")}`),
  ],
  deleteBydID: [],
};

module.exports = todoRules;
