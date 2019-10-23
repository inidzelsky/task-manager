"use strict";

//Basic Dependencies
const path = require("path");
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Secondary Dependencies
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
  async (req, res) => {
    //Checking errors existance
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Getting credentials
      const { name, email, password } = req.body;

      //Checking whether the user with the email exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ msg: `User with the email: ${email} already exists` });
      }

      //Creating a User document
      user = new User({
        name,
        email,
        password
      });

      //Hashing password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //User document saving
      await user.save();

      //Creating payload and getting secret for JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      const jwtSecret = config.get("jwtSecret");

      //JWT Signature
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000
        },
        (e, token) => {
          if (e) throw new Error(e);
          res.json({ token });
        }
      );
    } catch (e) {
      //Error handling
      console.error(e.message);
      res.status(500).json({ msg: "Server error occured" });
    }
  }
);

module.exports = router;
