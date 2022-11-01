// controlls the home page

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";


export async function clientHome(req: Request, res: Response): Promise<void> {
	console.log("display all blog");

	try{
		const theBlog = await blog.findAll({});
		
		res.render("client/index", {
			posts: theBlog.data
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}