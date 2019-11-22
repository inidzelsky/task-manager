"use strict";

//Basic dependencies
const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Secondary dependencies
const { check, validationResult } = require("express-validator");
const User = require(path.join(__dirname, "..", "models", "User"));
const validate = require(path.join(__dirname, "..", "middlewares", "validate"));
const { authGet, authPost } = require(path.join(
  __dirname,
  "..",
  "middlewares",
  "middlewares"
));

const router = express.Router();

//@method POST /api/auth
//@desc Gets token and authenticates user
//@access Public
router.post(
  "/",
  //Validation functions
  [
    check("email", "Please, enter a valid email").isEmail(),
    check(
      "password",
      "Please, enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  authPost
);

//@method GET /api/auth
//@desc Get logged in user
//@access Private
router.get("/", validate, authGet);

module.exports = router;
