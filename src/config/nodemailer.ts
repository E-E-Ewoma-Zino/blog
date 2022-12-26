import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
	host: "cpanel-s251.web-hosting.com",
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: "info@onefinanceblog.com",
		pass: "Admin1@onefinanceblog.com"
	}
});

export default transporter;