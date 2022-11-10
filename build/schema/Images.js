"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the images
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Image", imageSchema);
