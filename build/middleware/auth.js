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
const messageBird_1 = __importDefault(require("../utils/messageBird"));
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.cookies.cookme;
        if (!token) {
            messageBird_1.default.message(alerts_1.default.DANGER, "You need authorisation to continue");
            return res.render("admin/login", {
                bird: messageBird_1.default.fly
            });
        }
        // return res.status(STATUS.FORBIDDEN_403).json(SERVER_RES({ message: "A token is required for authentication", err: "Authentication Failed", status: STATUS.FORBIDDEN_403, alert: ALERTS.DANGER }));
        // remove Bearer form the token if it is there
        // token = token.replace("Bearer ", '');
        try {
            const secretString = process.env.TOKEN_KEY || "backupsecret";
            const decoded = jsonwebtoken_1.default.verify(token, secretString);
            res.locals.user = decoded;
        }
        catch (err) {
            const _err = err;
            console.log("Error in middleware auth", _err);
            console.log("Error in middleware auth", _err.message);
            messageBird_1.default.message(alerts_1.default.DANGER, _err.message);
            return res.render("admin/login", {
                bird: messageBird_1.default.fly
            });
            // return res.status(STATUS.FORBIDDEN_403).json(SERVER_RES({ message: "A token is required for authentication", err: _err.message, status: STATUS.FORBIDDEN_403, alert: ALERTS.DANGER }));
        }
        return next();
    });
}
exports.default = auth;
;
