// controlls all the authentication for the users

import { Request, Response } from "express";

export default (req: Request, res: Response) => {
	req.logout;
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		return res.redirect("/");
	});
}