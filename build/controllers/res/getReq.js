"use strict";
// use this route to get response on the different schema
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../../libs/user"));
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
function getRes(req, res) {
    console.log(">body", req.params);
    let schema = user_1.default;
    // assign the schema
    switch (req.params.schema.toLowerCase()) {
        case "user":
            schema = user_1.default;
            break;
        default: return res.status(httpStatus_1.default.NOT_FOUND_404).json((0, serverResponse_1.SERVER_RES)({ err: "Could not find the schema", message: "Bad request!", alert: alerts_1.default.DANGER, status: httpStatus_1.default.NOT_FOUND_404 }));
    }
    // call the method
    switch (req.params.method.toLowerCase()) {
        case "all":
            all(req, res);
            break;
        case "byid":
            byId(req, res);
            break;
        case "byopt":
            byOpt(req, res);
            break;
        case "populated":
            allAndPopulate(req, res);
            break;
        case "populatedbyid":
            byIdAndPopulate(req, res);
            break;
        default: return res.status(httpStatus_1.default.NOT_FOUND_404).json((0, serverResponse_1.SERVER_RES)({ err: "Could not find the method", message: "Bad request!", alert: alerts_1.default.DANGER, status: httpStatus_1.default.NOT_FOUND_404 }));
    }
    // define the method
    function all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = yield schema.findAll(), { status } = _a, otherData = __rest(_a, ["status"]);
                return res.status(status).json((0, serverResponse_1.SERVER_RES_ARRAY)(Object.assign({ status }, otherData)));
            }
            catch (error) {
                const err = error;
                return res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "An error occured in our server", err: err.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.SERVER_ERR_500 }));
            }
        });
    }
    function byId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = yield schema.findById(new mongoose_1.Types.ObjectId(req.query.id)), { status } = _a, otherData = __rest(_a, ["status"]);
                return res.status(status).json((0, serverResponse_1.SERVER_RES)(Object.assign({ status }, otherData)));
            }
            catch (error) {
                const err = error;
                return res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "An error occured in our server", err: err.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.SERVER_ERR_500 }));
            }
        });
    }
    function byOpt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = yield schema.findAll({ [req.query.opt]: req.query.value }), { status } = _a, otherData = __rest(_a, ["status"]);
                return res.status(status).json((0, serverResponse_1.SERVER_RES_ARRAY)(Object.assign({ status }, otherData)));
            }
            catch (error) {
                const err = error;
                return res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "An error occured in our server", err: err.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.SERVER_ERR_500 }));
            }
        });
    }
    function allAndPopulate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = yield schema.findAllAndPopoulate({}, req.query.opt), { status } = _a, otherData = __rest(_a, ["status"]);
                return res.status(status).json((0, serverResponse_1.SERVER_RES_ARRAY)(Object.assign({ status }, otherData)));
            }
            catch (error) {
                const err = error;
                return res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "An error occured in our server", err: err.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.SERVER_ERR_500 }));
            }
        });
    }
    function byIdAndPopulate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = yield schema.findByIdAndPopulate(new mongoose_1.Types.ObjectId(req.query.id), req.query.opt), { status } = _a, otherData = __rest(_a, ["status"]);
                return res.status(status).json((0, serverResponse_1.SERVER_RES)(Object.assign({ status }, otherData)));
            }
            catch (error) {
                const err = error;
                return res.status(httpStatus_1.default.SERVER_ERR_500).json((0, serverResponse_1.SERVER_RES)({ message: "An error occured in our server", err: err.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.SERVER_ERR_500 }));
            }
        });
    }
}
exports.default = getRes;
