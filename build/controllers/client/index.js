"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const about_1 = require("./about");
const blog_1 = require("./blog");
const home_1 = require("./home");
const client = {
    home: home_1.clientHome,
    blog: blog_1.clientBlog,
    about: about_1.clientAbout
};
exports.default = client;
