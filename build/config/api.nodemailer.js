"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "srv5.myukserver.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: "sales@dockcontainers.com",
        pass: "1-Very-strong-password"
    }
});
exports.default = transporter;
