'use strict';

const express = require("express");
const router = express.Router();

//@method GET /api/tasks
//@desc Get all the tasks
//@access Private
router.get('/', (req, res) => {
  res.send('Gets the tasks');
});

//@method POST /api/tasks
//@desc Creates a task
//@access Private
router.post('/', (req, res) => {
  res.send('Creates a task');
})

//@method PUT /api/tasks/:id
//@desc Updates a task
//@access Private
router.put('/:id', (req, res) => {
  res.send(`Updates the task with the id ${req.params.id}`);
})

//@method DELETE /api/tasks/:id
//@desc Deletes a task
//@access Private
router.delete('/:id', (req, res) => {
  res.send(`Deletes the task with the id ${req.params.id}`);
})

module.exports = router;