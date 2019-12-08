"use strict";

const path = require("path");
const config = require("config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require(path.join(__dirname, "..", "models", "User"));
const Task = require(path.join(__dirname, "..", "models", "Task"));

//Register middleware
const registerPost = async (req, res) => {
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
        .json({ msg: `User with the email: ${email} already exists`, type: "Exist" });
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
};

//Auth middlewares
const authPost = async (req, res) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Checking the user existance
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //Checking the password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid.credentials" });
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
        res.json({ token });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Server error occured" });
  }
};

const authGet = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Server error occured" });
  }
};

//Tasks middlewares
const tasksPost = async (req, res) => {
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
};

const tasksGet = async (req, res) => {
  try {
    const { id } = req.user;
    const tasks = await Task.find({ user: id }).sort({ date: -1 });
    res.json({ tasks });
  } catch (e) {
    console.error(e.message);
    res.status().json({ msg: "Server Error Occured" });
  }
};

const tasksPut = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const userid = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).json({ msg: "Task was not found" });

    if (userid !== task.user.toString())
      res.status(400).json({ msg: "Not authorised" });
    const { title } = req.body;
    const changeField = { title };

    const newTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: changeField },
      { new: true }
    );

    res.json(newTask);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Server Error Occured" });
  }
};

const tasksDelete = async (req, res) => {
  try {
    const userid = req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task was not found" });

    if (userid !== task.user.toString())
      return res.status(400).json({ msg: "Not authorised" });

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: "Task was removed" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Server Error Occured" });
  }
};

module.exports = {
  registerPost,
  authPost,
  authGet,
  tasksPost,
  tasksGet,
  tasksPut,
  tasksDelete
};
