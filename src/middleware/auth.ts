// this middleware checks if the users token is valid or if it has expire
import { NextFunction, Request, Response } from "express";
import messageBird from "../utils/messageBird";

export default async function auth(req: Request, res: Response, next: NextFunction) {
	if(!req.isAuthenticated()) return res.render("admin/login", {
		bird: messageBird.fly
	});
	return next();
};