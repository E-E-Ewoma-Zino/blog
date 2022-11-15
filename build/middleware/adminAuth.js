"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this middleware checks if the users token is valid or if it has expire
const alerts_1 = __importDefault(require("../constants/alerts"));
const messageBird_1 = __importDefault(require("../utils/messageBird"));
function adminAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        if (user.authLevel < 1) {
            messageBird_1.default.message(alerts_1.default.WARNING, "You are not authorised!");
            return res.redirect("/");
        }
        return next();
    });
}
exports.default = adminAuth;
;
