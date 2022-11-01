// controlls the dynamic blog

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";


export async function getAllBlog(req: Request, res: Response): Promise<void> {
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

export default async function getBlog(req: Request, res: Response): Promise<void> {
	console.log("display blog page", req.params);

	try{
		const theBlog = await blog.findAll({topic: req.params.topic});
		
		res.send(theBlog);
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}