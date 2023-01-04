import { IRouter, Request, Response, Router } from "express";
import adminAuth from "../middleware/adminAuth";
import mailchimp, { testMarketingMailchimp, testTransactionalMailchimp } from "../config/mailchimp";
import auth from "../middleware/auth";
import { MessagesMessage } from "@mailchimp/mailchimp_transactional";
import apiTransporter from "../config/api.nodemailer";
import transporter from "../config/nodemailer";
import cors from "cors";
import STATUS from "../constants/httpStatus";
import { SERVER_RES } from "../constants/serverResponse";
import ALERTS from "../constants/alerts";
import messageBird from "../utils/messageBird";

const router: IRouter = Router();

//options for cors midddleware
const options: cors.CorsOptions = {
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
router.use(cors(options));

// @desc	Send a mail
// @route	POST /mail/send
router.post("/send", async (req: Request, res: Response) => {
	console.log("body", req.body);

	var mailMessage = {
		from: "info@onefinanceblog.com",
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.message
	};

	transporter.sendMail(mailMessage, function (error, data) {
		if (error) {
			console.log("Email err:", error);
			res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({ message: "Failed to send mail", err: error.message, alert: ALERTS.DANGER, status: STATUS.BAD_REQUEST_400 }));
		} else {
			console.log('Email sent: ' + data.response);
			res.status(STATUS.CREATED_201).json(SERVER_RES({ message: "Mail Sent", err: null, alert: ALERTS.SUCCESS, status: STATUS.CREATED_201 }));
		}
	});
});

// @desc	Send a mail
// @route	POST /mail/api
router.post("/api", async (req: Request, res: Response) => {
	console.log("body", req.body);

	var mailMessage = {
		from: "sales@dockcontainers.com",
		to: "sales@dockcontainers.com",
		subject: req.body.subject,
		text: `From: ${req.body.email}\nName: ${req.body.name}\nPhone no: ${req.body.phone}\nMessage: ${req.body.message}`,
		html: `
		<div style="text-align: center;width: 50%;">

		<img src="https://www.dockcontainers.com/assets/img/favicon/apple-touch-icon.png" alt="dock containers" width="32px" style="
		width: 100px;
	">
		<div style="background-color: #078b4e;padding: 1em;color: white;font-weight: bolder;font-family: sans-serif;">
			<h2>${req.body.subject}</h2>
			<span>From: <a href="mailto:${req.body.email}">${req.body.email}</a></span>
			<br>
			<span>Name: ${req.body.name}</span>
			<br>
			<span>From: <a href="tel:${req.body.phone}">${req.body.phone}</a></span>
	
			<br>
			<span>Message:</span>
		<p style="margin-top: 1em;">${req.body.message}</p>
	</div>
		</div>
		`
	};

	apiTransporter.sendMail(mailMessage, function (error, data) {
		if (error) {
			console.log("Email err:", error);
			res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({ message: "Failed to send mail", err: error.message, alert: ALERTS.DANGER, status: STATUS.BAD_REQUEST_400 }));
		} else {
			console.log('Email sent: ' + data.response);
			res.status(STATUS.CREATED_201).json(SERVER_RES({ message: "Mail Sent", err: null, alert: ALERTS.SUCCESS, status: STATUS.CREATED_201 }));
		}
	});
});

// @desc	Join newslatter
// @route	POST /mail/newslatter
router.post("/newslatter", async (req: Request, res: Response) => {
	console.log("body", req.body);

	const listId = "783e5bb232";
	const subscribingUser = {
		// firstName: "Prudence",
		// lastName: "McVankab",
		email: req.body.email
	};

	try {
		const response = await mailchimp.marketingMC.lists.addListMember(listId, {
			email_address: subscribingUser.email,
			status: "subscribed"
			// merge_fields: {
			// 	FNAME: subscribingUser.firstName,
			// 	LNAME: subscribingUser.lastName
			// }
		});

		console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
		messageBird.message(ALERTS.SUCCESS, "Thank you for subscribing");
		res.redirect("back");
	} catch (error) {
		messageBird.message(ALERTS.DANGER, "Something went wrong");
		res.redirect("back");
	}
});


// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));

export default router;