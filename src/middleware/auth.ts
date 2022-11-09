// this middleware checks if the users token is valid or if it has expire
import jwt, { Secret } from "jsonwebtoken";
import ALERTS from "../constants/alerts";
import STATUS from "../constants/httpStatus";
import { SERVER_RES } from "../constants/serverResponse";
import { NextFunction, Request, Response } from "express";
import messageBird from "../utils/messageBird";

export default async function auth(req: Request, res: Response, next: NextFunction) {
	let token = req.cookies.cookme;

	if (!token) {
		messageBird.message(ALERTS.DANGER, "You need authorisation to continue");

		return res.render("admin/login", {
			bird: messageBird.fly
		});
	}

	// return res.status(STATUS.FORBIDDEN_403).json(SERVER_RES({ message: "A token is required for authentication", err: "Authentication Failed", status: STATUS.FORBIDDEN_403, alert: ALERTS.DANGER }));

	// remove Bearer form the token if it is there
	// token = token.replace("Bearer ", '');

	try {
		const secretString: Secret = process.env.TOKEN_KEY || "backupsecret";
		const decoded = jwt.verify(token, secretString);
		
		res.locals.user = decoded;
	} catch (err) {
		const _err = err as Error;
		console.log("Error in middleware auth", _err);
		console.log("Error in middleware auth", _err.message);

		messageBird.message(ALERTS.DANGER, _err.message);

		return res.render("admin/login", {
			bird: messageBird.fly
		});
		// return res.status(STATUS.FORBIDDEN_403).json(SERVER_RES({ message: "A token is required for authentication", err: _err.message, status: STATUS.FORBIDDEN_403, alert: ALERTS.DANGER }));
	}
	return next();
};