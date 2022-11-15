// controlls all the authentication for the users
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import { IUser } from "../../interfaces/schema";
import Users from "../../schema/Users";
import messageBird from "../../utils/messageBird";

export default async (req: Request, res: Response) => {
	const { password, email, ...body } = req.body;
	
	const theUser = await Users.findOne({ email }) as IUser;

	if(theUser) {
		messageBird.message(ALERTS.WARNING, "The user already exist");
		return res.redirect("back");
	}
	
	const newUser = await Users.create({email, password, ...body});

	req.logIn(newUser, function (reqLogIn_err) {
		if (reqLogIn_err) {
			messageBird.message("danger", reqLogIn_err.replace(/username/g, "email"));
			console.log("::reqLogIn_err:", reqLogIn_err);
			return;
		}

		// checking where the auth is coming from
		const authUser = req.user as IUser;

		messageBird.message("success", "Welcome " + authUser.username);
		return res.redirect("back");
	});
}