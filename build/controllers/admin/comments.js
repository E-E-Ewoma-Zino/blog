"use strict";
// update blog comment
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
exports.deleteComment = exports.updateComment = exports.verifyComment = void 0;
const mongoose_1 = require("mongoose");
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
const blog_1 = __importDefault(require("../../libs/blog"));
const Blogs_1 = __importDefault(require("../../schema/Blogs"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function verifyComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("body", req.body);
            console.log("query", req.query);
            const queryId = new mongoose_1.Types.ObjectId(req.query.id);
            const updateBlogComment = yield blog_1.default.update({
                itemToUpdate: { _id: queryId },
                optionsToUse: "$set",
                propertyToUpdate: `comments.${req.body.itemId}.isVerified`,
                updateValue: true
            });
            if (updateBlogComment.err)
                return res.status(httpStatus_1.default.CONFLICT_409).json((0, serverResponse_1.SERVER_RES)({ message: "Could not verify, try again", err: updateBlogComment.err, status: httpStatus_1.default.CONFLICT_409, alert: alerts_1.default.DANGER }));
            res.status(httpStatus_1.default.ACCPTED_202).json((0, serverResponse_1.SERVER_RES)({ message: "Verified", err: updateBlogComment.err, status: httpStatus_1.default.ACCPTED_202, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed To Verify", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.verifyComment = verifyComment;
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("body", req.body);
            console.log("query", req.query);
            const blogId = new mongoose_1.Types.ObjectId(req.body.id);
            if (req.body.data === '')
                return res.status(httpStatus_1.default.CONFLICT_409).json((0, serverResponse_1.SERVER_RES)({ message: "You did not choose a date", err: "Invalid Date", status: httpStatus_1.default.CONFLICT_409, alert: alerts_1.default.DANGER }));
            const blogUpdate = yield Blogs_1.default.updateOne({ _id: blogId }, { "$set": { [`comments.${req.body.itemId}.createdAt`]: new Date(req.body.date) } });
            if (!blogUpdate.modifiedCount)
                return res.status(httpStatus_1.default.CONFLICT_409).json((0, serverResponse_1.SERVER_RES)({ message: "Could not change date, try again", err: "Failed", status: httpStatus_1.default.CONFLICT_409, alert: alerts_1.default.DANGER }));
            res.status(httpStatus_1.default.ACCPTED_202).json((0, serverResponse_1.SERVER_RES)({ message: "Updagted Date", err: null, status: httpStatus_1.default.ACCPTED_202, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed To Change Date", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.updateComment = updateComment;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("body", req.body);
            console.log("query", req.query);
            const queryId = new mongoose_1.Types.ObjectId(req.query.id);
            const updateBlogComment = yield blog_1.default.update({
                itemToUpdate: { _id: queryId },
                optionsToUse: "$pull",
                propertyToUpdate: `comments`,
                updateValue: { _id: req.body.itemId }
            });
            if (updateBlogComment.err)
                return res.status(httpStatus_1.default.CONFLICT_409).json((0, serverResponse_1.SERVER_RES)({ message: "Could not verify, try again", err: updateBlogComment.err, status: httpStatus_1.default.CONFLICT_409, alert: alerts_1.default.DANGER }));
            res.status(httpStatus_1.default.ACCPTED_202).json((0, serverResponse_1.SERVER_RES)({ message: "Verified", err: updateBlogComment.err, status: httpStatus_1.default.ACCPTED_202, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed To Verify", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.deleteComment = deleteComment;
