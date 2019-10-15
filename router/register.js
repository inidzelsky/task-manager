'use strict';

const express = require("express");
const { check, validationResult } = require('express-validator');
const User = require('./../models/User');

const router = express.Router();
//@method POST /api/register
//@desc Register a user
//@access Public
router.post('/', [
  check('email', 'Please, enter a valid email').isEmail(), 
  check('password', 'Please, enter a password with 6 or more characters').isLength({min: 6}),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  res.json(req.body);
});

module.exports = router;