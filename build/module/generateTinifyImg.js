"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// generate tinify img
const tinify_1 = __importDefault(require("tinify"));
exports.default = (imgPath, imgName) => {
    tinify_1.default.key = process.env.TINIFY_API_KEK;
    const source = tinify_1.default.fromFile(imgPath);
    const resized = source.resize({
        method: "thumb",
        width: 300,
        height: 300
    });
    resized.toFile(`${__dirname}/../../uploads/thumbnail/${imgName}`);
    return `/uploads/thumbnail/${imgName}`;
};
