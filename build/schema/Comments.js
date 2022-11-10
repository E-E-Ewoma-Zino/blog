"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the users
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    blogId: mongoose_1.Schema.Types.ObjectId,
    userId: mongoose_1.Schema.Types.ObjectId,
    comment: String,
    reply: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Comment", commentSchema);
