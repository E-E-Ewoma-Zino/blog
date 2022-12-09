"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const mailchimp_1 = __importStar(require("../config/mailchimp"));
const auth_1 = __importDefault(require("../middleware/auth"));
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const serverResponse_1 = require("../constants/serverResponse");
const alerts_1 = __importDefault(require("../constants/alerts"));
const router = (0, express_1.Router)();
// @desc	Send a mail
// @route	POST /mail/send
router.post("/send", auth_1.default, adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    // fuck mailchimp
    // testTransactionalMailchimp();
    // const message = {
    // 	from_email: "info@global-finance-news.com",
    // 	subject: req.body.subject,
    // 	text: req.body.message,
    // 	to: [{
    // 		email: req.body.to,
    // 		type: "to"
    // 	}]
    // };
    // const response = await mailchimp.transactionMC.messages.send({
    // 	message: message as MessagesMessage
    // });
    // console.log(response);
    var mailMessage = {
        from: "info@global-finance-news.com",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
    };
    nodemailer_1.default.sendMail(mailMessage, function (error, data) {
        if (error) {
            console.log("Email err:", error);
            res.status(httpStatus_1.default.BAD_REQUEST_400).json((0, serverResponse_1.SERVER_RES)({ message: "Failed to send mail", err: error.message, alert: alerts_1.default.DANGER, status: httpStatus_1.default.BAD_REQUEST_400 }));
        }
        else {
            console.log('Email sent: ' + data.response);
            res.status(httpStatus_1.default.CREATED_201).json((0, serverResponse_1.SERVER_RES)({ message: "Mail Sent", err: null, alert: alerts_1.default.SUCCESS, status: httpStatus_1.default.CREATED_201 }));
        }
    });
}));
// @desc	Join newslatter
// @route	POST /mail/newslatter
router.post("/newslatter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    (0, mailchimp_1.testMarketingMailchimp)();
    const event = {
        name: "Global Finance Mail"
    };
    const footerContactInfo = {
        company: "Mailchimp",
        address1: "675 Ponce de Leon Ave NE",
        address2: "Suite 5000",
        city: "Atlanta",
        state: "GA",
        zip: "30308",
        country: "US"
    };
    const campaignDefaults = {
        from_name: "Admin",
        from_email: "info@global-finance-news.com",
        subject: "Welcome",
        language: "EN_US"
    };
    const response = yield mailchimp_1.default.marketingMC.lists.createList({
        name: event.name,
        contact: footerContactInfo,
        permission_reminder: "permission_reminder",
        email_type_option: true,
        campaign_defaults: campaignDefaults
    });
    console.log(`Successfully created an audience. The audience id is ${response.id}.`);
    res.redirect("back");
}));
// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));
exports.default = router;
