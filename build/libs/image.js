"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Images_1 = __importDefault(require("../schema/Images"));
const edit_1 = __importDefault(require("./edit"));
class Image extends edit_1.default {
    constructor(schema) {
        super(schema);
    }
}
exports.default = new Image(Images_1.default);
