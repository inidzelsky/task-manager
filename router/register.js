"use strict";

//Basic Dependencies
const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Secondary Dependencies
const { check, validationResult } = require("express-validator");
const { registerPost } = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "middlewares"
));
const User = require(path.join(__dirname, "..", "models", "User.js"));

//Router init
const router = express.Router();

//@method POST /api/register
//@desc Register a user
//@access Public
router.post(
  "/",
  [
    //Request data validation
    check("email", "Please, enter a valid email").isEmail(),
    check(
      "password",
      "Please, enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("name", "Please enter a name")
      .not()
      .isEmpty()
  ],
  registerPost
);

module.exports = router;
