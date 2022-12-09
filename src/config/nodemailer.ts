import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
	host: "cpanel-s251.web-hosting.com",
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: "info@global-finance-news.com",
		pass: "Admin1@global-finance-news.com"
	}
});

export default transporter;