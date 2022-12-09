import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
	// port: 5006, // Postfix uses port 25
	// host: "localhost",
	// tls: {
	//   rejectUnauthorized: false
	// }
	host: "cpanel-s251.web-hosting.com:2096",
	port: 465,
	secure: true,
	requireTLS: true,
	auth: {
		user: "info@global-finance-news.com",
		pass: "Admin1@global-finance-news.com"
	}
});

export default transporter;