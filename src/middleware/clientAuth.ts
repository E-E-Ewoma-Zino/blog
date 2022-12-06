// this middleware checks if the users token is valid or if it has expire
import { NextFunction, Request, Response } from "express";
import messageBird from "../utils/messageBird";

export default async function clientAuth(req: Request, res: Response, next: NextFunction) {
	if(!req.isAuthenticated()) return res.render("client/login", {
		bird: messageBird.fly,
		user: req.isAuthenticated()? true: false
	});
	return next();
};