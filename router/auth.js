'use strict';

const express = require("express");
const router = express.Router();

//@method POST /api/auth
//@desc Gets token and authenticates user
//@access Public
router.post('/', (req, res) => {
  res.send('Log in');
});

//@method GET /api/auth
//@desc Get logged in user
//@access Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

module.exports = router;