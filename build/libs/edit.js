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
// manipulates the db
const alerts_1 = __importDefault(require("../constants/alerts"));
const mongoose_1 = require("mongoose");
const serverResponse_1 = require("../constants/serverResponse");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
class Edit {
    constructor(schema) {
        // this.schema = schema;
        let _schema = schema;
        this.getSchema = function () { return _schema; };
    }
    findById(schemaId, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!schemaId || !(0, mongoose_1.isValidObjectId)(schemaId))
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.FORBIDDEN_403, alert: alerts_1.default.DANGER, message: "Invalid request using id of " + schemaId, err: "Invalid Request!" });
                const item = yield this.getSchema().findById({ _id: schemaId }).exec(callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not find item with id " + schemaId, err: "Not found!", data: item });
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to findById:", err);
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to findById", err: _err.message });
            }
        });
    }
    findAllAndPopoulate(opt, populateOpt, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.getSchema().find(opt).populate(populateOpt).exec(callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not findAllAndPopoulate item with opt " + populateOpt, err: "Not found!", data: [] });
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items with opt " + populateOpt, err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to findAllAndPopoulate:", err);
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to findAllAndPopoulate", err: _err.message, data: [] });
            }
        });
    }
    findByIdAndPopulate(schemaId, populateOpt, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!schemaId || !(0, mongoose_1.isValidObjectId)(schemaId))
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.FORBIDDEN_403, alert: alerts_1.default.WARNING, message: "Invalid request using id of " + schemaId, err: "Invalid Request!" });
                const item = yield this.getSchema().findById({ _id: schemaId }).populate(populateOpt).exec(callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not findByIdAndPopoulate item with id " + schemaId, err: "Not found!", data: item });
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found item with id " + schemaId, err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to findByIdAndPopoulate:", err);
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to findByIdAndPopoulate", err: _err.message });
            }
        });
    }
    findAll(opt = {}, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.getSchema().find(opt, callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not findAll", err: "Not found!", data: [] });
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items", err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to findAll:", err);
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to findAll", err: _err.message, data: [] });
            }
        });
    }
    aggregate(agg = {}, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.getSchema().aggregate(agg, callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not aggregate", err: "Not found!", data: [] });
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items", err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to aggregate:", err);
                return (0, serverResponse_1.SERVER_RES_ARRAY)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to aggregate", err: _err.message, data: [] });
            }
        });
    }
    create(data = {}, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.getSchema().create(data, callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not create", err: "Not found!" });
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items", err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to create:", err);
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to create", err: _err.message });
            }
        });
    }
    remove(schemaId, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.getSchema().deleteOne({ _id: schemaId }, callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not remove", err: "Not found!" });
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items", err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to remove:", err);
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to remove", err: _err.message });
            }
        });
    }
    // update an item
    update({ itemToUpdate, propertyToUpdate, optionsToUse, updateValue }, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!itemToUpdate._id || !(0, mongoose_1.isValidObjectId)(itemToUpdate._id))
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.FORBIDDEN_403, alert: alerts_1.default.WARNING, message: "Invalid request using id of " + itemToUpdate, err: "Invalid Request!" });
                const item = yield this.getSchema().findOneAndUpdate(itemToUpdate, { [optionsToUse.toString()]: { [propertyToUpdate.toString()]: updateValue } }, callback);
                if (!item)
                    return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.NOT_FOUND_404, alert: alerts_1.default.DANGER, message: "Could not update", err: "Not found!" });
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.OK_200, alert: alerts_1.default.SUCCESS, message: "Found items", err: null, data: item });
            }
            catch (err) {
                const _err = err;
                console.error("Server Error! Failed to update:", err);
                return (0, serverResponse_1.SERVER_RES)({ status: httpStatus_1.default.SERVER_ERR_500, alert: alerts_1.default.DANGER, message: "Server Error! Failed to update", err: _err.message });
            }
        });
    }
}
exports.default = Edit;
