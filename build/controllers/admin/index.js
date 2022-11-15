"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = require("./blogs");
const comments_1 = require("./comments");
const createBlog_1 = require("./createBlog");
const dashboard_1 = require("./dashboard");
const editBlog_1 = require("./editBlog");
const storage_1 = require("./storage");
const admin = {
    storage: storage_1.storage,
    verifyComment: comments_1.verifyComment,
    deleteComment: comments_1.deleteComment,
    storageDelete: storage_1.storageDelete,
    storageUpload: storage_1.storageUpload,
    blogs: blogs_1.adminBlogs,
    editBlog: editBlog_1.adminEditBlog,
    dashboard: dashboard_1.adminDashboard,
    createBlog: createBlog_1.adminCreateBlog
};
exports.default = admin;
