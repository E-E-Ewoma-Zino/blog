"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comments_1 = __importDefault(require("../schema/Comments"));
const edit_1 = __importDefault(require("./edit"));
class Comment extends edit_1.default {
    constructor(schema) {
        super(schema);
    }
}
exports.default = new Comment(Comments_1.default);
