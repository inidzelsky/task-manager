"use strict";

//Basic dependencies
const path = require("path");
const express = require("express");

//Secondary dependencies
const { check, validationResult } = require("express-validator");
const validate = require(path.join(__dirname, "..", "middlewares", "validate"));
const { tasksPost, tasksGet, tasksPut, tasksDelete } = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "middlewares"
));
const User = require(path.join(__dirname, "..", "models", "User"));
const Task = require(path.join(__dirname, "..", "models", "Task"));

//Router init
const router = express.Router();

//@method GET /api/tasks
//@desc Get all the tasks
//@access Private
router.get("/", validate, tasksGet);

//@method POST /api/tasks
//@desc Creates a task
//@access Private
router.post(
  "/",
  [
    validate,
    [
      check("title", "Task title is required")
        .not()
        .isEmpty()
    ]
  ],
  tasksPost
);

//@method PUT /api/tasks/:id
//@desc Updates a task
//@access Private
router.put(
  "/:id",
  [
    validate,
    [
      check("title", "Task title is required")
        .not()
        .isEmpty()
    ]
  ],
  tasksPut
);

//@method DELETE /api/tasks/:id
//@desc Deletes a task
//@access Private
router.delete("/:id", validate, tasksDelete);

module.exports = router;
