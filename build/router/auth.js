"use strict";
// authentication route
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/authentication/login"));
const logout_1 = __importDefault(require("../controllers/authentication/logout"));
const register_1 = __importDefault(require("../controllers/authentication/register"));
const router = (0, express_1.Router)();
// @desc	Reguster a user useing this route
// @route	GET /auth/logout
router.get("/logout", (req, res) => (0, logout_1.default)(req, res));
// @desc	Reguster a user useing this route
// @route	POST /auth/register
router.post("/register", (req, res) => (0, register_1.default)(req, res));
// @desc	Login a user useing this route
// @route	POST /auth/login
router.post("/login", (req, res, next) => (0, login_1.default)(req, res, next));
exports.default = router;
