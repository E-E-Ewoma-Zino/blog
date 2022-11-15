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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alerts_1 = __importDefault(require("../../constants/alerts"));
const Users_1 = __importDefault(require("../../schema/Users"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password, email } = _a, body = __rest(_a, ["password", "email"]);
    const theUser = yield Users_1.default.findOne({ email });
    if (theUser) {
        messageBird_1.default.message(alerts_1.default.WARNING, "The user already exist");
        return res.redirect("back");
    }
    const newUser = yield Users_1.default.create(Object.assign({ email, password }, body));
    req.logIn(newUser, function (reqLogIn_err) {
        if (reqLogIn_err) {
            messageBird_1.default.message("danger", reqLogIn_err.replace(/username/g, "email"));
            console.log("::reqLogIn_err:", reqLogIn_err);
            return;
        }
        // checking where the auth is coming from
        const authUser = req.user;
        messageBird_1.default.message("success", "Welcome " + authUser.username);
        return res.redirect("back");
    });
});
