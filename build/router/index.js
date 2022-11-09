"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const auth_1 = __importDefault(require("./auth"));
const routes = {
    baseRoute: base_1.default,
    auth: auth_1.default
};
exports.default = routes;
