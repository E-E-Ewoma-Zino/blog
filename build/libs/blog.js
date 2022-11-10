"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blogs_1 = __importDefault(require("../schema/Blogs"));
const edit_1 = __importDefault(require("./edit"));
class Blog extends edit_1.default {
    constructor(schema) {
        super(schema);
    }
}
exports.default = new Blog(Blogs_1.default);
