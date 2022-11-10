"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../controllers/blog"));
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
// @desc	Blog Router
// @route	GET /blog/
router.get("/", (req, res) => {
    res.send("BLOG POST GOES HERE");
});
// @desc	Create a blog api
// @route	POST /blog/
router.post("/", multer_1.default.single("image"), (req, res) => blog_1.default.create(req, res));
// @desc	Update a blog api
// @route	POST /blog/update
router.put("/update", multer_1.default.single("image"), (req, res) => blog_1.default.update(req, res));
// @desc	Delete a blog api
// @route	POST /blog/delete
router.delete("/delete", (req, res) => blog_1.default.delete(req, res));
// @desc	Comment a blog api
// @route	POST /blog/comment
router.patch("/comment", (req, res) => blog_1.default.comment(req, res));
exports.default = router;
