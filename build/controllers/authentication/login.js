"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// controlls all the authentication for the users
const passport_1 = __importDefault(require("passport"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
exports.default = (req, res, next) => {
    // console.log("body", req.body)
    // LogIn a user
    // I am using the passport custom callback to authenticate the user
    passport_1.default.authenticate("local", function (logIn_err, user, info) {
        // if any exceptions happen, come here
        // TODO: Add means to tell the user that the process failed
        if (logIn_err) {
            messageBird_1.default.message("danger", "Email or Password invalid");
            console.log("::logIn_err:", logIn_err, info);
            return next(logIn_err);
        }
        // if user is not found, come here
        if (!user) {
            messageBird_1.default.message("danger", "User does not exist, Create an account");
            console.log("NO USER FOUND!", info);
            return res.redirect("back");
        }
        // if everything goes well, come here
        req.logIn(user, function (reqLogIn_err) {
            if (reqLogIn_err) {
                messageBird_1.default.message("danger", "Authentication Failed");
                console.log("::reqLogIn_err:", reqLogIn_err);
                return next(reqLogIn_err);
            }
            // checking where the auth is coming from
            const theUser = req.user;
            messageBird_1.default.message("success", "Welcome " + theUser.username);
            return res.redirect("back");
        });
    })(req, res, next);
};
