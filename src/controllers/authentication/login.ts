// controlls all the authentication for the users
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import messageBird from "../../utils/messageBird";
import { IUser } from "../../interfaces/schema";

export default (req: Request, res: Response, next: NextFunction) => {
	// LogIn a user
	// I am using the passport custom callback to authenticate the user
	passport.authenticate("local", function (logIn_err, user, info) {
		// if any exceptions happen, come here
		// TODO: Add means to tell the user that the process failed
		if (logIn_err) {
			messageBird.message("danger", "Email or Password invalid");
			console.log("::logIn_err:", logIn_err, info);
			return next(logIn_err);
		}
		// if user is not found, come here
		if (!user) {
			messageBird.message("danger", "User does not exist, Create an account");
			console.log("NO USER FOUND!", info);
			return res.redirect("back");
		}
		// if everything goes well, come here
		req.logIn(user, function (reqLogIn_err) {
			if (reqLogIn_err) {
				messageBird.message("danger", "Authentication Failed");
				console.log("::reqLogIn_err:", reqLogIn_err);
				return next(reqLogIn_err);
			}

			// checking where the auth is coming from
			const theUser = req.user as IUser;

			messageBird.message("success", "Welcome " + theUser.username);
			return res.redirect("back");
		});
	})(req, res, next);
}