"use strict";
// controlls all the authentication for the users
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    req.logout;
    req.session.destroy((err) => {
        res.clearCookie("connect.sid");
        return res.redirect("/");
    });
};
