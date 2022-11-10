"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the users
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    slug: {
        type: String,
        unique: true
    },
    subTitle: String,
    keywords: String,
    description: String,
    markdown: String,
    convertedMD: String,
    comments: [{
            user: String,
            comment: String,
            isVerified: Boolean,
            createdAt: Date
        }],
    mainImage: Object
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Blog", blogSchema);
