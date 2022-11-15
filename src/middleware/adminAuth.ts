// this middleware checks if the users token is valid or if it has expire
import ALERTS from "../constants/alerts";
import { IUser } from "../interfaces/schema";
import messageBird from "../utils/messageBird";
import { NextFunction, Request, Response } from "express";

export default async function adminAuth(req: Request, res: Response, next: NextFunction) {
	const user = req.user as IUser;
	
	if(user.authLevel < 1) {
		messageBird.message(ALERTS.WARNING, "You are not authorised!");
		return res.redirect("/");
	}

	return next();
};