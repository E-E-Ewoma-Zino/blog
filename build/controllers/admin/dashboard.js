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
exports.adminDashboard = void 0;
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
const blog_1 = __importDefault(require("../../libs/blog"));
const image_1 = __importDefault(require("../../libs/image"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function adminDashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const blogs = yield blog_1.default.findAll();
            const images = yield image_1.default.findAll();
            const blogData = blogs.data;
            let bC = 0;
            blogData.forEach(blog => {
                bC += blog.comments.length;
            });
            bC /= blogs.data.length;
            res.render("admin/index", {
                blogs: blogs.data,
                blogLength: blogs.data.length,
                imageLength: images.data.length,
                blogCommentRatio: bC,
                user: user.username,
                bird: messageBird_1.default.fly
            });
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.adminDashboard = adminDashboard;
