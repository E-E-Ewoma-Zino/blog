"use strict";
// control the blog behaviour
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const create_1 = __importDefault(require("./create"));
const update_1 = __importDefault(require("./update"));
const delete_1 = __importDefault(require("./delete"));
const comment_1 = __importDefault(require("./comment"));
const blog = {
    get: get_1.default,
    create: create_1.default,
    update: update_1.default,
    delete: delete_1.default,
    comment: comment_1.default
};
exports.default = blog;
