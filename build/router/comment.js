"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../controllers/blog"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// @desc	Create a comment
// @route	POST /comment/
router.post("/", auth_1.default, (req, res) => blog_1.default.comment(req, res));
// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));
exports.default = router;
