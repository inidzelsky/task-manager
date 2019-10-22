'use strict';

const path = require("path");
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require(path.join(__dirname, "..", "models", "User"));
const validate = require(path.join(__dirname, "..", "middlewares", "validate"));

const router = express.Router();

//@method POST /api/auth
//@desc Gets token and authenticates user
//@access Public
router.post(
  '/', 
  //Validation functions
  [check("email", "Please, enter a valid email").isEmail(),
  check("password", "Please, enter a password with 6 or more characters").isLength({ min: 6 })], 
  async (req, res) => {
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    //Checking the user existance
    try {
      const { email, password } = req.body;
      let user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({msg: "Invalid credentials"});
      }
    
    //Checking the password matching
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({msg: "Invalid.credentials"});
      }
  
    //Init token  
      const payload = {
        user: {
          id: user.id
        }
      };
  
      const jwtSecret = config.get("jwtSecret");
  
      jwt.sign(
        payload, 
        jwtSecret,
        {
          expiresIn: 360000
        },
        (e, token) => {
          if (e) throw new Error(e);
          res.json({token});
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).json({msg: "Server error occured"});
    }
});

//@method GET /api/auth
//@desc Get logged in user
//@access Private
router.get(
  '/',
  validate, 
  async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findById(id).select("-password");
      res.json(user);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({msg: "Server error occured"});
    }
  }
);

module.exports = router;