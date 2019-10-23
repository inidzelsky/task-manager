"use strict";

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    title: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("task", TaskSchema);