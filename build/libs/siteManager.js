"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SiteManager_1 = __importDefault(require("../schema/SiteManager"));
const edit_1 = __importDefault(require("./edit"));
class SiteManager extends edit_1.default {
    constructor(schema) {
        super(schema);
    }
}
exports.default = new SiteManager(SiteManager_1.default);
