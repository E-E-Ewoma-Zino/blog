// controlls the dashboard
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog, IUser } from "../../interfaces/schema";
import user from "../../libs/user";
import messageBird from "../../utils/messageBird";


export async function allUsers(req: Request, res: Response): Promise<void> {
	try{
		const theUser = req.user as IUser;
		const allUsers = await user.findAll();
		
		res.render("admin/users", {
			user: theUser.username,
			allUsers: allUsers.data,
			bird: messageBird.fly
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}

export async function removeUser(req: Request, res: Response): Promise<void> {
	try {
		console.log("body", req.body);
		const removedUser = await user.remove(req.body.itemId);
		res.status(STATUS.OK_200).json(SERVER_RES({ message: "User removed", err: null, alert: ALERTS.SUCCESS, status: STATUS.OK_200 }));
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed to remove user", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}