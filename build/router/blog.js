"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../controllers/blog"));
const multer_1 = __importDefault(require("../config/multer"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const router = (0, express_1.Router)();
// @desc	Blog Router
// @route	GET /blog/
router.get("/", (req, res) => {
    res.redirect("/");
});
// @desc	Create a blog api
// @route	POST /blog/
router.post("/", adminAuth_1.default, multer_1.default.single("image"), (req, res) => blog_1.default.create(req, res));
// @desc	Update a blog api
// @route	POST /blog/update
router.put("/update", adminAuth_1.default, multer_1.default.single("image"), (req, res) => blog_1.default.update(req, res));
// @desc	Delete a blog api
// @route	POST /blog/delete
router.delete("/delete", adminAuth_1.default, (req, res) => blog_1.default.delete(req, res));
// @desc	Comment a blog api
// @route	POST /blog/comment
// router.patch("/comment", auth, (req: Request, res: Response): Promise<void> => blog.comment(req, res));
exports.default = router;
