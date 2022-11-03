// controlls the dynamic blog page

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";

export async function clientBlog(req: Request, res: Response): Promise<void> {
	console.log("display all blog");

	try{
		const theBlog = await blog.findAll({ slug: req.params.slug });
		// res.send(theBlog.data[0]);
		res.render("client/blog", {
			blog: theBlog.data[0]
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}