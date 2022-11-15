// controlls the dashboard
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog, IUser } from "../../interfaces/schema";
import blog from "../../libs/blog";
import image from "../../libs/image";
import messageBird from "../../utils/messageBird";


export async function adminDashboard(req: Request, res: Response): Promise<void> {
	try{
		const user = req.user as IUser;
		const blogs = await blog.findAll();
		const images = await image.findAll();

		const blogData = blogs.data as Array<IBlog>;
		let bC: number = 0;
		blogData.forEach(blog => {
			bC += blog.comments.length;
		});
		bC /= blogs.data.length;

		res.render("admin/index", {
			blogs: blogs.data,
			blogLength: blogs.data.length,
			imageLength: images.data.length,
			blogCommentRatio: bC,
			user: user.username,
			bird: messageBird.fly
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}