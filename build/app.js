"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("./config/passport"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const error404_1 = require("./controllers/errors/error404");
// import { initialize, Passport, session } from "passport";
const express_1 = __importStar(require("express"));
// config .env
(0, dotenv_1.config)();
// create app
const app = (0, express_1.default)();
// configs
app.use((0, express_1.json)());
app.use(express_1.default.static("public"));
app.set("view engine", "ejs");
app.use((0, express_1.urlencoded)({ extended: true }));
app.use('/uploads', express_1.default.static("uploads"));
app.use((0, method_override_1.default)("_method"));
// session setup
// tell app to use express session
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3 * 24 * 60 * 1000
    }
}));
// passport config
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// app.use(initialize());
// app.use(session());
// set up db
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, db_1.default)(); }))();
// My routes
// @desc	for all client post "/client"
// @route	/
app.use("/", router_1.default.client);
// @desc	for user authentication "/auth"
// @route	/auth
app.use("/auth", router_1.default.auth);
// @desc	for all admin post "/admin"
// @route	/admin
app.use("/admin", router_1.default.admin);
// @desc	for all blog post "/blog"
// @route	/blog
app.use("/blog", router_1.default.blog);
// @desc	for all comment api "/comment"
// @route	/comment
app.use("/comment", router_1.default.comment);
// @desc	404 Page
app.use((req, res) => (0, error404_1.error404)(req, res));
const port = Number(process.env.PORT) || 5001;
app.listen(port, () => console.log(process.env.NODE_ENV, "app at port", port));
/* cross-env NODE_ENV=Production */ 
