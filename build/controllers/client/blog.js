"use strict";
// controlls the dynamic blog page
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
exports.clientBlog = void 0;
const blog_1 = __importDefault(require("../../libs/blog"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
function clientBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("display all blog");
        try {
            const theBlog = yield blog_1.default.findAll({ slug: req.params.slug });
            const allBlog = yield blog_1.default.findAll({});
            const data = theBlog.data[0];
            const siteUrl = "https://www.global-finance-news.com/";
            const head = {
                themeColor: "#ffffff",
                title: data === null || data === void 0 ? void 0 : data.title,
                keywords: data === null || data === void 0 ? void 0 : data.keywords,
                ogImageType: data === null || data === void 0 ? void 0 : data.mainImage.mimetype,
                ogUrl: siteUrl + "blogs/" + (data === null || data === void 0 ? void 0 : data.slug),
                ogTitle: data === null || data === void 0 ? void 0 : data.title,
                description: data === null || data === void 0 ? void 0 : data.description,
                ogImage: siteUrl + (data === null || data === void 0 ? void 0 : data.mainImage.path),
                siteUrl
            };
            res.render("client/blog", {
                blog: data,
                blogs: allBlog.data,
                head
            });
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.clientBlog = clientBlog;
