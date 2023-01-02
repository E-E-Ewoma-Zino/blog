import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
	host: "srv5.myukserver.com",
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: "sales@dockcontainers.com",
		pass: "1-Very-strong-password"
	}
});

export default transporter;