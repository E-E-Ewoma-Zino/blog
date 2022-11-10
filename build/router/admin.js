"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const admin_1 = __importDefault(require("../controllers/admin"));
const router = (0, express_1.Router)();
// @desc	Admin Router
// @route	GET /
router.get("/", (req, res) => admin_1.default.dashboard(req, res));
// @desc	Admin blog page
// @route	GET /blog
router.get("/blog", (req, res) => admin_1.default.blogs(req, res));
// @desc	Admin create blog page
// @route	GET /blog/create
router.get("/blog/create", (req, res) => admin_1.default.createBlog(req, res));
// @desc	Admin edit blog page
// @route	GET /blog/edit/:slug
router.get("/blog/edit/:slug", (req, res) => admin_1.default.editBlog(req, res));
// @desc	Admin storage
// @route	GET /storage
router.get("/storage", (req, res) => admin_1.default.storage(req, res));
// @desc	Admin storage
// @route	POST /storage
router.post("/storage", multer_1.default.single("image"), (req, res) => admin_1.default.storageUpload(req, res));
// @desc	Admin storage
// @route	POST /storage
router.delete("/storage", (req, res) => admin_1.default.storageDelete(req, res));
exports.default = router;
