"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("../config/multer"));
const admin_1 = __importDefault(require("../controllers/admin"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const router = (0, express_1.Router)();
// @desc	Admin Router
// @route	GET /
router.get("/", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.dashboard(req, res));
// @desc	Admin blog page
// @route	GET /blog
router.get("/blog", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.blogs(req, res));
// @desc	Admin create blog page
// @route	GET /blog/create
router.get("/blog/create", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.createBlog(req, res));
// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.get("/blog/edit/:slug", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.editBlog(req, res));
// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.patch("/blog/edit/:slug/comment", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.verifyComment(req, res));
// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.delete("/blog/edit/:slug/comment", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.deleteComment(req, res));
// @desc	Admin storage
// @route	GET /storage
router.get("/storage", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.storage(req, res));
// @desc	Admin storage
// @route	POST /storage
router.post("/storage", auth_1.default, adminAuth_1.default, multer_1.default.single("image"), (req, res) => admin_1.default.storageUpload(req, res));
// @desc	Admin storage
// @route	POST /storage
router.delete("/storage", auth_1.default, adminAuth_1.default, (req, res) => admin_1.default.storageDelete(req, res));
exports.default = router;
