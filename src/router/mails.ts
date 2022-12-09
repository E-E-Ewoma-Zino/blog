import { IRouter, Request, Response, Router } from "express";
import adminAuth from "../middleware/adminAuth";
import mailchimp, { testMarketingMailchimp, testTransactionalMailchimp } from "../config/mailchimp";
import auth from "../middleware/auth";
import { MessagesMessage } from "@mailchimp/mailchimp_transactional";
import transporter from "../config/nodemailer";
import STATUS from "../constants/httpStatus";
import { SERVER_RES } from "../constants/serverResponse";
import ALERTS from "../constants/alerts";

const router: IRouter = Router();

// @desc	Send a mail
// @route	POST /mail/send
router.post("/send", auth, adminAuth, async (req: Request, res: Response) => {
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

	transporter.sendMail(mailMessage, function (error, data) {
		if (error) {
			console.log("Email err:", error);
			res.status(STATUS.BAD_REQUEST_400).json(SERVER_RES({message: "Failed to send mail", err: error.message, alert: ALERTS.DANGER, status: STATUS.BAD_REQUEST_400 }));
		} else {
			console.log('Email sent: ' + data.response);
			res.status(STATUS.CREATED_201).json(SERVER_RES({message: "Mail Sent", err: null, alert: ALERTS.SUCCESS, status: STATUS.CREATED_201 }));
		}
	});
});

// @desc	Join newslatter
// @route	POST /mail/newslatter
router.post("/newslatter", async (req: Request, res: Response) => {
	console.log("body", req.body);

	testMarketingMailchimp();

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

	const response = await mailchimp.marketingMC.lists.createList({
		name: event.name,
		contact: footerContactInfo,
		permission_reminder: "permission_reminder",
		email_type_option: true,
		campaign_defaults: campaignDefaults
	});

	console.log(
		`Successfully created an audience. The audience id is ${response.id}.`
	);

	res.redirect("back");
});


// @desc	Display a blog post
// @route	GET /blog/post/:topic
// router.get("/posts/:topic", (req: Request, res: Response): Promise<void> => blog.get(req, res));

export default router;