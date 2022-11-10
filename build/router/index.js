"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const blog_1 = __importDefault(require("./blog"));
const admin_1 = __importDefault(require("./admin"));
const client_1 = __importDefault(require("./client"));
const comment_1 = __importDefault(require("./comment"));
const routes = {
    comment: comment_1.default,
    client: client_1.default,
    admin: admin_1.default,
    blog: blog_1.default,
    auth: auth_1.default
};
exports.default = routes;
