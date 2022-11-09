"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the users
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    // Things needed for all user Schema
    email: String,
    password: String,
    token: String,
    authLevel: {
        type: Number,
        min: 0,
        max: 1
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
