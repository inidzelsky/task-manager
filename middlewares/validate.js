"use strict";

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Getting token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json("Token is absent, authorisation denied");
  }

  //Validating token
  try {
    const jwtSecret = config.get("jwtSecret");
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e.message);
    res.status(401).json("Token is not valid, authorisation denied");
  }
};
