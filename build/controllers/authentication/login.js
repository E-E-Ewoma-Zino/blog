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
const user_1 = __importDefault(require("../../libs/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
const serverResponse_1 = require("../../constants/serverResponse");
const alerts_1 = __importDefault(require("../../constants/alerts"));
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Our login logic starts here
        try {
            // Get user input
            const { email, password } = req.body;
            // Validate user input
            if (!(email && password))
                return res.status(httpStatus_1.default.BAD_REQUEST_400).json((0, serverResponse_1.SERVER_RES)({ message: "All input is required", err: "Failed to login user", status: httpStatus_1.default.BAD_REQUEST_400, alert: alerts_1.default.DANGER }));
            // Validate if user exist in our database
            const theUser = yield user_1.default.findAll({ email });
            // tell data what it is
            const data = theUser.data[0];
            // check if a user was found
            if (!(data === null || data === void 0 ? void 0 : data._id))
                return res.status(httpStatus_1.default.UNAUTHORIZED_401).json((0, serverResponse_1.SERVER_RES)({ message: "User not found", err: "Failed to login user", status: httpStatus_1.default.UNAUTHORIZED_401, alert: alerts_1.default.DANGER }));
            // decrept password
            const decreptedPassword = yield bcryptjs_1.default.compare(password, data.password);
            if (!decreptedPassword)
                return res.status(httpStatus_1.default.UNAUTHORIZED_401).json((0, serverResponse_1.SERVER_RES)({ message: "Password mismatch", err: "Failed to login user", status: httpStatus_1.default.UNAUTHORIZED_401, alert: alerts_1.default.DANGER }));
            // Create token
            const tokenData = { user_id: data._id, email };
            const secretString = process.env.TOKEN_KEY || "backupstring";
            const expirationTime = { expiresIn: "2h" };
            const token = jsonwebtoken_1.default.sign(tokenData, secretString, expirationTime);
            // save user token
            const updateUserWithToken = yield user_1.default.update({
                itemToUpdate: { _id: data._id },
                optionsToUse: "$set",
                propertyToUpdate: "token",
                updateValue: token
            });
            console.log("updated user", updateUserWithToken);
            if (updateUserWithToken.status !== httpStatus_1.default.OK_200)
                return res.status(updateUserWithToken.status).json(updateUserWithToken);
            // user
            console.log("Done");
            // add token to header
            console.log(">", req.headers["authorization"]);
            req.headers["authorization"] = "Bearer " + token;
            console.log(">d", req.headers["authorization"]);
            return res.status(httpStatus_1.default.CREATED_201).json((0, serverResponse_1.SERVER_RES)({ data, message: "Successfully Registered", err: null, status: httpStatus_1.default.CREATED_201, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Login", err: _err.message, status: 500, alert: alerts_1.default.DANGER }));
        }
        // Our register logic ends here
    });
}
exports.default = LoginUser;
