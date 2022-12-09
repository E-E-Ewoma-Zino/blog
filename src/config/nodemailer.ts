import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
	host: "global-finance-news.com",
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: "info@global-finance-news.com",
		pass: "Admin1@global-finance-news.com"
	}
});

export default transporter;