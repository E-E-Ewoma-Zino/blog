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
const passport_1 = __importDefault(require("passport"));
const Users_1 = __importDefault(require("../schema/Users"));
const passport_local_1 = require("passport-local");
const comparePassword_1 = __importDefault(require("../module/comparePassword"));
const option = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
};
const myLocalStrategy = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ email: username });
    if (user && (yield (0, comparePassword_1.default)(username, password)))
        done(null, user);
    else
        done(null, false);
});
// configure passport
passport_1.default.use(new passport_local_1.Strategy(option, myLocalStrategy));
// This methode works better than the one above
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err, false);
        }
    });
});
exports.default = passport_1.default;
