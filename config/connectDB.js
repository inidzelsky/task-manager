"use strict";

const mongoose = require("mongoose");
const config = require("config");
const MongoURI = config.get("MongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    
    console.log("MongoDB connected!");
  } catch (err) {
    process.exit(1);
  }
}

module.exports = connectDB;