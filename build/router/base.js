"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getReq_1 = __importDefault(require("../controllers/res/getReq"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// @desc	Home Router
// @route	/
router.get("/", (req, res) => {
    res.send("API SERVICES FOR ELECTION DAY");
});
router.get("/welcome", auth_1.default, (req, res) => {
    console.log("req", res.locals.user);
    res.send("Welcome {{wave}}");
});
// @desc	API
// @route	/api/:schema/:mehtod
router.get("/api/:schema/:method", (req, res) => (0, getReq_1.default)(req, res));
exports.default = router;
