'use strict';

const express = require("express");
const router = express.Router();

//@method POST /api/register
//@desc Register a user
//@access Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;