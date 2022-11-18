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
const fs_1 = __importDefault(require("fs"));
const blog_1 = __importDefault(require("../../libs/blog"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
const serverResponse_1 = require("../../constants/serverResponse");
function deleteBolg(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("body", req.body);
        const { itemId } = req.body;
        try {
            const theBlog = yield blog_1.default.findById(itemId);
            const data = theBlog.data;
            // delete img
            // Using fs to also delete the book file
            if (data) {
                fs_1.default.unlink(__dirname + "../../../../" + data.mainImage.path, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        messageBird_1.default.message(alerts_1.default.WARNING, "Issues deleting blog image");
                        // res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ message: "Could not find image", err: err.message, status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER }));
                    }
                }));
                fs_1.default.unlink(__dirname + "../../../../" + data.mainImage.path.replace("uploads\\", "uploads/thumbnail/"), (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        messageBird_1.default.message(alerts_1.default.WARNING, "Issues deleting thumbnail blog image");
                        // res.status(STATUS.NOT_FOUND_404).json(SERVER_RES({ message: "Could not find image", err: err.message, status: STATUS.NOT_FOUND_404, alert: ALERTS.DANGER }));
                    }
                }));
                const deleteBlog = yield blog_1.default.remove(itemId);
                if (!deleteBlog.data) {
                    messageBird_1.default.message(alerts_1.default.SUCCESS, "Issues deleting blog");
                    res.status(httpStatus_1.default.NOT_FOUND_404).json((0, serverResponse_1.SERVER_RES)({ message: "Could not find image", err: deleteBlog.err, status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER }));
                }
                else {
                    messageBird_1.default.message(alerts_1.default.SUCCESS, "Deleted Blog");
                    res.status(httpStatus_1.default.NO_CONTENT_204).json((0, serverResponse_1.SERVER_RES)({ message: "Deleted Blog", err: null, status: httpStatus_1.default.NO_CONTENT_204, alert: alerts_1.default.SUCCESS }));
                }
            }
            else {
                messageBird_1.default.message(alerts_1.default.SUCCESS, "Failed to delete blog");
                res.status(httpStatus_1.default.BAD_REQUEST_400).json((0, serverResponse_1.SERVER_RES)({ message: "Failed to delete", err: itemId + " is not found in the db", status: httpStatus_1.default.BAD_REQUEST_400, alert: alerts_1.default.SUCCESS }));
            }
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            messageBird_1.default.message(alerts_1.default.DANGER, "Internal Server Error");
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed To Delete", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.default = deleteBolg;
