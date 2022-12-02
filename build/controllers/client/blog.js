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
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function clientBlog(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("display all blog");
        try {
            const theBlog = yield blog_1.default.findAll({ slug: req.params.slug });
            const allBlog = yield blog_1.default.findAll({});
            const data = theBlog.data[0];
            if (!data) {
                messageBird_1.default.message(alerts_1.default.WARNING, "Page does not or no longer exist");
                res.redirect("/");
            }
            const siteUrl = "https://www.global-finance-news.com/";
            const head = {
                themeColor: "#ffffff",
                title: data === null || data === void 0 ? void 0 : data.title,
                keywords: data === null || data === void 0 ? void 0 : data.keywords,
                ogImageType: (_a = data === null || data === void 0 ? void 0 : data.mainImage) === null || _a === void 0 ? void 0 : _a.mimetype,
                ogUrl: siteUrl + "blogs/" + (data === null || data === void 0 ? void 0 : data.slug),
                ogTitle: data === null || data === void 0 ? void 0 : data.title,
                description: data === null || data === void 0 ? void 0 : data.description,
                ogImage: siteUrl + ((_c = (_b = data === null || data === void 0 ? void 0 : data.mainImage) === null || _b === void 0 ? void 0 : _b.path) === null || _c === void 0 ? void 0 : _c.replace("uploads\\", "uploads/thumbnail/")),
                siteUrl,
                siteName: "Global Finance"
            };
            const user = req.user;
            res.render("client/blog", {
                head,
                blog: data,
                blogs: allBlog.data,
                bird: messageBird_1.default.fly,
                user: req.isAuthenticated() ? user.username : false
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
