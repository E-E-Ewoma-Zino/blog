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
// controlls all the post requests
const blog_1 = __importDefault(require("../../libs/blog"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
const preBlog_1 = __importDefault(require("../../module/preBlog"));
function createBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("body", req.body);
        console.log("file", req.file);
        const { title, markdown, subTitle, author, keywords, description } = req.body;
        try {
            const newBlog = yield blog_1.default.create({
                title,
                author,
                subTitle,
                markdown,
                keywords,
                description,
                mainImage: req.file
            });
            if (newBlog.err)
                messageBird_1.default.message(alerts_1.default.DANGER, newBlog.err);
            else
                messageBird_1.default.message(alerts_1.default.SUCCESS, "New Blog Created");
            // pre validate blog
            (0, preBlog_1.default)(newBlog.data._id);
            res.redirect("back");
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.redirect("back");
            // res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
        }
    });
}
exports.default = createBlog;
