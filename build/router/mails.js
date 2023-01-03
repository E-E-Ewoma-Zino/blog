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
const express_1 = require("express");
const mailchimp_1 = __importDefault(require("../config/mailchimp"));
const api_nodemailer_1 = __importDefault(require("../config/api.nodemailer"));
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const cors_1 = __importDefault(require("cors"));
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const serverResponse_1 = require("../constants/serverResponse");
const alerts_1 = __importDefault(require("../constants/alerts"));
const messageBird_1 = __importDefault(require("../utils/messageBird"));
const router = (0, express_1.Router)();
//options for cors midddleware
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    preflightContinue: false,
};
//use cors middleware
router.use((0, cors_1.default)(options));
// @desc	Send a mail
// @route	POST /mail/send
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    var mailMessage = {
        from: "info@onefinanceblog.com",
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
// @desc	Send a mail
// @route	POST /mail/api
router.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    var mailMessage = {
        from: "sales@dockcontainers.com",
        to: "sales@dockcontainers.com",
        subject: req.body.subject,
        text: `From: ${req.body.email}\nName: ${req.body.name}\nPhone no: ${req.body.phone} ${req.body.message}`
    };
    api_nodemailer_1.default.sendMail(mailMessage, function (error, data) {
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
    const listId = "783e5bb232";
    const subscribingUser = {
        // firstName: "Prudence",
        // lastName: "McVankab",
        email: req.body.email
    };
    try {
        const response = yield mailchimp_1.default.marketingMC.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed"
            // merge_fields: {
            // 	FNAME: subscribingUser.firstName,
            // 	LNAME: subscribingUser.lastName
            // }
        });
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
        messageBird_1.default.message(alerts_1.default.SUCCESS, "Thank you for subscribing");
        res.redirect("back");
    }
    catch (error) {
        messageBird_1.default.message(alerts_1.default.DANGER, "Something went wrong");
        res.redirect("back");
    }
}));
// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));
exports.default = router;
