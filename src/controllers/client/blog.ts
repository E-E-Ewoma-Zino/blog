// controlls the dynamic blog page

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog, IUser } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";

export async function clientBlog(req: Request, res: Response): Promise<void> {
	console.log("display all blog");
	
	try{
		const theBlog = await blog.findAll({ slug: req.params.slug });
		const allBlog = await blog.findAll({});
		
		const data = theBlog.data[0] as IBlog;
		if(!data) {
			messageBird.message(ALERTS.WARNING, "Page does not or no longer exist");
			res.redirect("/");
		}
		
		const siteUrl = "https://www.onefinanceblog.com/";
		
		const head = {
			themeColor: "#ffffff",
			title: data?.title,
			keywords: "Xpress Coaching, " + data?.keywords,
			ogImageType: data?.mainImage?.mimetype,
			ogUrl: siteUrl + "blogs/" + data?.slug,
			ogTitle: data?.title,
			description: data?.description,
			ogImage: siteUrl + data?.mainImage?.path?.replace("uploads\\", "uploads/thumbnail/"),
			siteUrl,
			siteName: "One Finance Blog"
		}

		const user = req.user as IUser;

		res.render("client/blog", {
			head,
			blog: data,
			blogs: allBlog.data,
			bird: messageBird.fly,
			user: req.isAuthenticated()? user.username: false
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}