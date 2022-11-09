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
const dotenv_1 = require("dotenv");
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const router_1 = __importDefault(require("./router"));
// config .env
(0, dotenv_1.config)();
// create app
const app = (0, express_1.default)();
// configs
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname + '/uploads')));
// set up db
(() => __awaiter(void 0, void 0, void 0, function* () { return yield (0, db_1.default)(); }))();
// @desc	for all home route "/"
// @route	home
app.use("/", router_1.default.baseRoute);
// @desc	for all admin route "/"
// @route	/admin
app.use("/auth", router_1.default.auth);
// @desc	404 Page
app.use((req, res) => res.status(404).send("404 Not Found!"));
const port = Number(process.env.PORT) || 5001;
app.listen(port, () => console.log(process.env.NODE_ENV, "app at port", port));
/* cross-env NODE_ENV=Production */ 
