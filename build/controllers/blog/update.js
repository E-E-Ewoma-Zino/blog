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
// controlls update for blog post requests
const fs_1 = __importDefault(require("fs"));
const Blogs_1 = __importDefault(require("../../schema/Blogs"));
const preBlog_1 = __importDefault(require("../../module/preBlog"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
const generateTinifyImg_1 = __importDefault(require("../../module/generateTinifyImg"));
function editBolg(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("body", req.body);
        console.log("query", req.query);
        console.log("file", req.file);
        const { title, subTitle, markdown, author, dummyDate, keywords, caption, description } = req.body;
        try {
            const updatedBlog = yield Blogs_1.default.findOneAndUpdate({ _id: req.query.id }, { $set: { title, subTitle, markdown, author, dummyDate, keywords, caption, description, mainImage: req.file } });
            if (req.file && updatedBlog)
                fs_1.default.stat(__dirname + "../../../../" + updatedBlog.mainImage.path, (fsStats_err, stats) => {
                    if (fsStats_err) {
                        console.error("fsStats_err:", fsStats_err);
                        try {
                            throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
                        }
                        catch (err) {
                            console.log("The Error:", err);
                        }
                    }
                    // Using fs to also delete the book file
                    fs_1.default.unlink(__dirname + "../../../../" + updatedBlog.mainImage.path, (unlink_err) => {
                        if (unlink_err) {
                            console.error("unlink_err:", unlink_err);
                            try {
                                throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
                            }
                            catch (err) {
                                console.log("The Error:", err);
                            }
                        }
                        else {
                            console.log("=================SAVE===============");
                            console.log("file deleted successfully");
                        }
                    });
                });
            // prevalidate blog
            (0, preBlog_1.default)(updatedBlog._id);
            // generate thumbnail
            if (req.file)
                (0, generateTinifyImg_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
            messageBird_1.default.message(alerts_1.default.SUCCESS, "Updated Blog");
            return res.redirect("back");
        }
        catch (err) {
            const _err = err;
            console.log("Error:>>>>>>>", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.redirect("back");
            // res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
        }
    });
}
exports.default = editBolg;
