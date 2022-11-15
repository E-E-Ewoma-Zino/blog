"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../controllers/blog"));
const client_1 = __importDefault(require("../controllers/client"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// @desc	Client Router
// @route	GET /
router.get("/", (req, res) => client_1.default.home(req, res));
// @desc	About Page
// @route	GET /about
router.get("/about", (req, res) => client_1.default.about(req, res));
// @desc	Blogs
// @route	GET /blogs/:slug
router.get("/blogs/:slug", (req, res) => client_1.default.blog(req, res));
// @desc	Blogs comments
// @route	GET /blogs/:slug
router.patch("/blogs/:slug", auth_1.default, (req, res) => blog_1.default.comment(req, res));
exports.default = router;
