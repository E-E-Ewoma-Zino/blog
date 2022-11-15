// controlls the create page
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import blog from "../../libs/blog";
import messageBird from "../../utils/messageBird";


export async function adminEditBlog(req: Request, res: Response): Promise<void> {
	try{
		const theBlog = await blog.findAll({ slug: req.params.slug });
		
		res.render("admin/editBlog", {
			bird: messageBird.fly,
			blog: theBlog.data[0]
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}