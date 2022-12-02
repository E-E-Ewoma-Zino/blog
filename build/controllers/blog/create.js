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
const generateTinifyImg_1 = __importDefault(require("../../module/generateTinifyImg"));
function createBlog(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("body", req.body);
        console.log("file", req.file);
        const { title, markdown, subTitle, author, keywords, caption, description } = req.body;
        try {
            const newBlog = yield blog_1.default.create({
                title,
                author,
                subTitle,
                caption,
                markdown,
                keywords,
                description,
                mainImage: req.file
            });
            if (newBlog.err) {
                messageBird_1.default.message(alerts_1.default.DANGER, newBlog.err);
                return res.redirect("back");
            }
            else
                messageBird_1.default.message(alerts_1.default.SUCCESS, "New Blog Created");
            // pre validate blog
            (0, preBlog_1.default)(newBlog.data._id);
            // crop img to thumbnail
            if (req.file)
                (0, generateTinifyImg_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
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
