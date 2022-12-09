"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "cpanel-s251.web-hosting.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: "info@global-finance-news.com",
        pass: "Admin1@global-finance-news.com"
    }
});
exports.default = transporter;
