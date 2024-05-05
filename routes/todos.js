const express = require("express");
const router = express.Router();
const { todoModel } = require("../models");

const response = require("../helpers/response");
const { todoRules } = require("../validators");

const validator = require("../middlewares/validationMiddleware.js");

//Post Method
router.post("/", todoRules.create, validator, async (req, res) => {
  try {
    const payload = new todoModel({
      subject: req.body.subject,
      description: req.body.description,
    });

    const result = await payload.save();
    response.ok(req, res, result);
  } catch (error) {
    response.serverError(req, res, error);
  }
});

//Get all Method
router.get("/", async (req, res) => {
  try {
    const result = await todoModel.find({ deleted_at: { $eq: null } });
    response.ok(req, res, result);
  } catch (error) {
    response.serverError(req, res, error);
  }
});

//Get by ID Method
router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return response.badRequest(req, res, "Missing required parameter: id");
    }
    const result = await todoModel.findOne({
      _id: req.params.id,
      deleted_at: { $eq: null },
    });

    if (!result) {
      return response.notFound(req, res);
    }
    response.ok(req, res, result);
  } catch (error) {
    response.serverError(req, res, error);
  }
});

//Update by ID Method
router.patch("/:id", todoRules.updateByID, validator, async (req, res) => {
  try {
    if (!req.params.id) {
      return response.badRequest(req, res, "Missing required parameter: id");
    }

    const existingTodo = await todoModel.findOne({
      _id: req.params.id,
      deleted_at: { $eq: null },
    });

    if (!existingTodo) {
      return response.notFound(req, res);
    }

    existingTodo.updated_at = new Date();
    Object.assign(existingTodo, req.body);
    const result = await existingTodo.save();

    response.ok(req, res, result);
  } catch (error) {
    response.serverError(req, res, error);
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return response.badRequest(req, res, "Missing required parameter: id");
    }

    const existingTodo = await todoModel.findOne({
      _id: req.params.id,
      deleted_at: { $eq: null },
    });

    if (!existingTodo) {
      return response.notFound(req, res);
    }

    existingTodo.deleted_at = new Date();
    Object.assign(existingTodo, req.body);
    const result = await existingTodo.save();

    response.ok(req, res, result);
  } catch (error) {
    response.serverError(req, res, error);
  }
});

module.exports = router;
