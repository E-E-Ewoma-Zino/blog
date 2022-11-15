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
exports.storageDelete = exports.storageUpload = exports.storage = void 0;
// controlls the dashboard
const fs_1 = __importDefault(require("fs"));
const image_1 = __importDefault(require("../../libs/image"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
const serverResponse_1 = require("../../constants/serverResponse");
function storage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const allImages = yield image_1.default.findAll({});
            const start = Number(req.query.start) || 0;
            const stop = Number(req.query.stop) || 20;
            if (allImages.err)
                messageBird_1.default.message(alerts_1.default.DANGER, "No images in db");
            res.render("admin/storage", {
                stop: stop,
                start: start,
                user: user.username,
                bird: messageBird_1.default.fly,
                mediaLength: allImages.data.length,
                images: allImages.data.reverse().slice(start, stop)
            });
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.storage = storage;
function storageUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("file", req.file);
            const newImage = yield image_1.default.create(req.file);
            if (newImage.err)
                messageBird_1.default.message(alerts_1.default.DANGER, "No images in db");
            else
                messageBird_1.default.message(alerts_1.default.SUCCESS, "Uploaded Image");
            res.redirect("back");
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.storageUpload = storageUpload;
function storageDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("body", req.body);
        const { itemId } = req.body;
        try {
            const theImage = yield image_1.default.findById(itemId);
            const data = theImage.data;
            console.log("here1");
            // delete img
            if (data)
                fs_1.default.stat(__dirname + "../../../../" + data.path, (fsStats_err, stats) => {
                    console.log("here2");
                    if (fsStats_err) {
                        console.error("fsStats_err:", fsStats_err);
                        try {
                            throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
                        }
                        catch (err) {
                            messageBird_1.default.message(alerts_1.default.DANGER, "Failed!");
                            console.log("The Error:", err);
                        }
                    }
                    // Using fs to also delete the book file
                    else
                        fs_1.default.unlink(__dirname + "../../../../" + data.path, (unlink_err) => __awaiter(this, void 0, void 0, function* () {
                            console.log("here3");
                            if (unlink_err) {
                                console.error("unlink_err:", unlink_err);
                                try {
                                    throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
                                }
                                catch (err) {
                                    messageBird_1.default.message(alerts_1.default.DANGER, "Failed!");
                                    console.log("The Error:", err);
                                }
                            }
                            else {
                                console.log("=================SAVE===============");
                                console.log("file deleted successfully");
                                yield image_1.default.remove(itemId);
                                messageBird_1.default.message(alerts_1.default.SUCCESS, "Deleted Image");
                            }
                        }));
                });
            res.status(httpStatus_1.default.NO_CONTENT_204).json((0, serverResponse_1.SERVER_RES)({ message: "Deleted Image", err: null, status: httpStatus_1.default.NO_CONTENT_204, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.storageDelete = storageDelete;
