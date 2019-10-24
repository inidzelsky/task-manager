"use strict";

const express = require("express");
const config = require("config");
const connectDB = require("./config/connectDB");
const app = express();

const PORT = config.get("PORT") || 5000;

//DB Connection
connectDB();

//JSON middleware
app.use(express.json({ extended: false }));

//Implementing router
app.use("/api/register", require("./router/register"));
app.use("/api/auth", require("./router/auth"));
app.use("/api/tasks", require("./router/tasks"));

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
