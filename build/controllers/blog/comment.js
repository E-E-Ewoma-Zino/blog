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
const alerts_1 = __importDefault(require("../../constants/alerts"));
const blog_1 = __importDefault(require("../../libs/blog"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { comment, blogId } = req.body;
        try {
            const user = req.user;
            yield blog_1.default.update({
                itemToUpdate: { _id: blogId },
                optionsToUse: "$push",
                propertyToUpdate: "comments",
                updateValue: {
                    user: {
                        email: user === null || user === void 0 ? void 0 : user.email,
                        username: user === null || user === void 0 ? void 0 : user.username
                    },
                    comment: comment.toString(),
                    isVerified: false,
                    createdAt: Date.now()
                }
            });
            messageBird_1.default.message(alerts_1.default.SUCCESS, "Thank you for your comment");
            // res.status(STATUS.CREATED_201).json(SERVER_RES({ message: "Ceated new comment", err: null, status: STATUS.CREATED_201, alert: ALERTS.SUCCESS }));
            res.redirect("back");
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.redirect("back");
            // res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
        }
    });
}
exports.default = createComment;
