// controlls the create page
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IUser } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";


export async function adminCreateBlog(req: Request, res: Response): Promise<void> {
	try{
		const user = req.user as IUser;

		res.render("admin/createBlog", {
			bird: messageBird.fly,
			user: user.username
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}