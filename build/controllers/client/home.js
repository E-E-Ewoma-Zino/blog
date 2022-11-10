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
function clientHome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const theBlog = yield blog_1.default.findAll({});
            const data = theBlog.data[0];
            const siteUrl = "https://www.global-finance-online.com/";
            const description = `Global finance news is a blog devoted to providing in-depth information on the financial world globally in areas that are crucial to everything finance you can rely on us to provide that information here it's what we are known for we continue to deliver in this regard. Detailed and easy-to-use information is what we offer at the very core of our structure.`;
            const head = {
                themeColor: "#ffffff",
                title: "Xpress Coaching",
                keywords: "Xpress Coaching, " + data.keywords,
                ogImageType: data.mainImage.mimetype,
                ogUrl: siteUrl + "blogs/" + data.slug,
                ogTitle: "Xpress Coaching",
                ogImage: siteUrl + data.mainImage.path,
                description,
                siteUrl
            };
            res.render("client/index", {
                blogs: theBlog.data,
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
