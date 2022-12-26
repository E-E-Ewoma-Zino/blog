// controlls the about page

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";


export async function clientAbout(req: Request, res: Response): Promise<void> {
	try{
		const theBlog = await blog.findAll({});
		
		const data = theBlog.data[0] as IBlog;
		const siteUrl = "https://www.onefinanceblog.com/";
		const description = `One finance blog is a blog devoted to providing in-depth information on the financial world globally in areas that are crucial to everything finance you can rely on us to provide that information here it's what we are known for we continue to deliver in this regard. Detailed and easy-to-use information is what we offer at the very core of our structure.`

		const head = {
			themeColor: "#ffffff",
			title: "One Finance Blog",
			keywords: "One Finance Blog, " + data?.keywords,
			ogImageType: data?.mainImage.mimetype,
			ogUrl: siteUrl + "blogs/" + data?.slug,
			ogTitle: data?.title,
			ogImage: siteUrl + "admin/images/logo.png",
			description,
			siteUrl,
			siteName: "One Finance Blog"
		}
		
		res.render("client/about", {
			bird: messageBird.fly,
			blogs: theBlog.data,
			user: req.isAuthenticated()? true: false,
			head
		});
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}