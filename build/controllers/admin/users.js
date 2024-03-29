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
exports.removeUser = exports.allUsers = void 0;
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
const user_1 = __importDefault(require("../../libs/user"));
const messageBird_1 = __importDefault(require("../../utils/messageBird"));
function allUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const theUser = req.user;
            const allUsers = yield user_1.default.findAll();
            res.render("admin/users", {
                user: theUser.username,
                allUsers: allUsers.data,
                bird: messageBird_1.default.fly
            });
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.allUsers = allUsers;
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("body", req.body);
            const removedUser = yield user_1.default.remove(req.body.itemId);
            res.status(httpStatus_1.default.OK_200).json((0, serverResponse_1.SERVER_RES)({ message: "User removed", err: null, alert: alerts_1.default.SUCCESS, status: httpStatus_1.default.OK_200 }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed to remove user", err: _err.message, status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER }));
        }
    });
}
exports.removeUser = removeUser;
