"use strict";
/*
Mongo user Model
Attributes: username, email, password, profile picture
 */
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Name is required!",
    },
    email: {
        type: String,
        required: "Email is required!",
    },
    password: {
        type: String,
        required: "Password is required!",
    },
    image: {
        type: String,
        required: "Image is required"
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);
