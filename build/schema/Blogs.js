"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module for the users
const slugify_1 = __importDefault(require("slugify"));
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
    caption: String,
    markdown: String,
    dummyDate: {
        type: Date,
        default: Date.now()
    },
    convertedMD: String,
    comments: [{
            user: {
                username: String,
                email: String
            },
            comment: String,
            isVerified: {
                type: Boolean,
                default: false
            },
            createdAt: Date
        }],
    mainImage: Object
}, { timestamps: true });
blogSchema.pre("save", function () {
    if (this.title) {
        this.slug = (0, slugify_1.default)(this.title, {
            lower: true,
            strict: true
        });
    }
});
exports.default = (0, mongoose_1.model)("Blog", blogSchema);
