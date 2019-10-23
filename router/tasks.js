"use strict";

const path = require("path");
const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require(path.join(__dirname, "..", "models", "User"));
const Task = require(path.join(__dirname, "..", "models", "Task"));
const validate = require(path.join(__dirname, "..", "middlewares", "validate"));
const router = express.Router();

//@method GET /api/tasks
//@desc Get all the tasks
//@access Private
router.get("/", validate, async (req, res) => {
  try {
    const { id } = req.user;
    const tasks = await Task.find({ user: id }).sort({ date: -1 });
    res.json({ tasks });
  } catch (e) {
    console.error(e.message);
    res.status().json({ msg: "Server Error Occured" });
  }
});

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title } = req.body;
      const { id } = req.user;
      const newTask = new Task({ user: id, title });

      const task = await newTask.save();
      res.json(task);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: "Server Error Occured" });
    }
  }
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const userid = req.user.id;
      const task = await Task.findById(req.params.id);
      if (!task) res.status(404).json({msg: "Task was not found"});
      
      if (userid !== task.user.toString()) res.status(400).json({msg: "Not authorised"});
      const { title } = req.body;
      const changeField = {title};
      
      const newTask = await Task.findByIdAndUpdate(req.params.id, {$set: changeField}, {new: true});

      res.json(newTask);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: "Server Error Occured" });
    }
  }
);

//@method DELETE /api/tasks/:id
//@desc Deletes a task
//@access Private
router.delete("/:id", validate ,async (req, res) => {
  try {
    const userid  = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({msg: "Task was not found"});
    
    if (userid !== task.user.toString()) return res.status(400).json({msg: "Not authorised"});

    await Task.findByIdAndRemove(req.params.id);
    res.json({msg: "Task was removed"});
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Server Error Occured" });
  }
});

module.exports = router;
