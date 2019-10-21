'use strict';

//Basic Dependencies
const path = require("path");
const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

//Secondary Dependencies
const User = require(path.join(__dirname, "..", "models", "User.js"));

const router = express.Router();

//@method POST /api/register
//@desc Register a user
//@access Public
router.post('/', [
  check('email', 'Please, enter a valid email').isEmail(), 
  check('password', 'Please, enter a password with 6 or more characters').isLength({min: 6}),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({msg: `User with the email: ${email} already exists`});
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    res.json({msg: "User Saved"});
  } catch (e) {
      console.error(e.message);
      res.status(500).json({msg: "Server error occured"});
  }
});

module.exports = router;