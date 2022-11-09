"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../schema/Users"));
const edit_1 = __importDefault(require("./edit"));
class User extends edit_1.default {
    constructor(schema) {
        super(schema);
    }
}
exports.default = new User(Users_1.default);
