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
const serverResponse_1 = require("../../constants/serverResponse");
const alerts_1 = __importDefault(require("../../constants/alerts"));
const httpStatus_1 = __importDefault(require("../../constants/httpStatus"));
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Our register logic starts here
        try {
            console.log("body", req.body);
            // Get user input
            const { email, password } = req.body;
            // Validate user input
            if (!(email && password))
                return res.status(httpStatus_1.default.BAD_REQUEST_400).json((0, serverResponse_1.SERVER_RES)({ message: "All input is required", err: "Failed to register user", status: httpStatus_1.default.BAD_REQUEST_400, alert: alerts_1.default.DANGER }));
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = yield user_1.default.findAll({ email });
            console.log("olduser is", oldUser);
            if (oldUser.status !== httpStatus_1.default.OK_200)
                return res.status(oldUser.status).json(oldUser);
            if (oldUser.data.length)
                return res.status(httpStatus_1.default.CONFLICT_409).json((0, serverResponse_1.SERVER_RES)({ message: "User Already Exist. Please Login", err: "Failed to register user", status: httpStatus_1.default.CONFLICT_409, alert: alerts_1.default.DANGER }));
            //Encrypt user password
            const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
            console.log("encryptedPassword", encryptedPassword);
            // Create user in our database
            const newUser = yield user_1.default.create({
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
            if (newUser.status !== httpStatus_1.default.OK_200)
                return res.status(newUser.status).json(newUser);
            const newUserData = newUser.data;
            console.log("newuser", newUser);
            // Create token
            const tokenData = { user_id: newUserData._id, email };
            const secretString = process.env.TOKEN_KEY || "backupsecret";
            const expirationTime = { expiresIn: "2h" };
            console.log("token", tokenData, "secret", secretString, "expiresIn", expirationTime);
            const token = jsonwebtoken_1.default.sign(tokenData, secretString, expirationTime);
            console.log("the Token", token);
            // save user token
            const updateUserWithToken = yield user_1.default.update({
                itemToUpdate: { _id: newUserData._id },
                propertyToUpdate: "token",
                optionsToUse: "$set",
                updateValue: token
            });
            console.log("updated user", updateUserWithToken);
            if (updateUserWithToken.status !== httpStatus_1.default.OK_200)
                return res.status(updateUserWithToken.status).json(updateUserWithToken);
            // return new user
            console.log("Done");
            return res.status(httpStatus_1.default.CREATED_201).json((0, serverResponse_1.SERVER_RES)({ message: "Successfully Registered", err: null, status: httpStatus_1.default.CREATED_201, alert: alerts_1.default.SUCCESS }));
        }
        catch (err) {
            const _err = err;
            console.log("Error:", _err);
            res.status(500).json((0, serverResponse_1.SERVER_RES)({ message: "Failed Registered", err: _err.message, status: 500, alert: alerts_1.default.DANGER }));
        }
        // Our register logic ends here
    });
}
exports.default = RegisterUser;
