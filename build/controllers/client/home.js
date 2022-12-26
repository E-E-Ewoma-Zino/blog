"use strict";
// controlls the home page
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
exports.clientHome = void 0;
const blog_1 = __importDefault(require("../../libs/blog"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function clientHome(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const theBlog = yield blog_1.default.findAll({});
            const data = theBlog.data[0];
            const siteUrl = "https://www.onefinanceblog.com/";
            const description = `One finance blog is a blog devoted to providing in-depth information on the financial world globally in areas that are crucial to everything finance you can rely on us to provide that information here it's what we are known for we continue to deliver in this regard. Detailed and easy-to-use information is what we offer at the very core of our structure.`;
            const head = {
                themeColor: "#ffffff",
                title: "One Finance Blog",
                keywords: "One Finance Blog, " + (data === null || data === void 0 ? void 0 : data.keywords),
                ogImageType: (_a = data === null || data === void 0 ? void 0 : data.mainImage) === null || _a === void 0 ? void 0 : _a.mimetype,
                ogUrl: siteUrl + "blogs/" + (data === null || data === void 0 ? void 0 : data.slug),
                ogTitle: "One Finance Blog",
                ogImage: siteUrl + ((_c = (_b = data === null || data === void 0 ? void 0 : data.mainImage) === null || _b === void 0 ? void 0 : _b.path) === null || _c === void 0 ? void 0 : _c.replace("uploads\\", "uploads/thumbnail/")),
                description,
                siteUrl,
                siteName: "One Finance Blog"
            };
            res.render("client/index", {
                bird: messageBird_1.default.fly,
                blogs: theBlog.data,
                user: req.isAuthenticated() ? true : false,
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
exports.clientHome = clientHome;
