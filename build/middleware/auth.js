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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const alerts_1 = __importDefault(require("../constants/alerts"));
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const serverResponse_1 = require("../constants/serverResponse");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        console.log("the token<<<", token);
        console.log("header", req.headers["authorization"]);
        if (!token)
            return res.status(httpStatus_1.default.FORBIDDEN_403).json((0, serverResponse_1.SERVER_RES)({ message: "A token is required for authentication", err: "Authentication Failed", status: httpStatus_1.default.FORBIDDEN_403, alert: alerts_1.default.DANGER }));
        try {
            const secretString = process.env.TOKEN_KEY || "backupsecret";
            const decoded = jsonwebtoken_1.default.verify(token, secretString);
            console.log("decoded", decoded);
            res.locals.user = decoded;
        }
        catch (err) {
            console.log("Error in middleware auth", err);
            return res.status(httpStatus_1.default.FORBIDDEN_403).json((0, serverResponse_1.SERVER_RES)({ message: "A token is required for authentication", err: "Authentication Failed", status: httpStatus_1.default.FORBIDDEN_403, alert: alerts_1.default.DANGER }));
        }
        return next();
    });
}
exports.default = auth;
;
