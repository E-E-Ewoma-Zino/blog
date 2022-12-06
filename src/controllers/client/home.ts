// controlls the home page

import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";

export async function clientHome(req: Request, res: Response): Promise<void> {
	try{
		const theBlog = await blog.findAll({});
		
		const data = theBlog.data[0] as IBlog;
		const siteUrl = "https://www.global-finance-news.com/";
		const description = `Global finance news is a blog devoted to providing in-depth information on the financial world globally in areas that are crucial to everything finance you can rely on us to provide that information here it's what we are known for we continue to deliver in this regard. Detailed and easy-to-use information is what we offer at the very core of our structure.`

		const head = {
			themeColor: "#ffffff",
			title: "Global Finance",
			keywords: "Global Finance, " + data?.keywords,
			ogImageType: data?.mainImage?.mimetype,
			ogUrl: siteUrl + "blogs/" + data?.slug,
			ogTitle: "Global Finance",
			ogImage: siteUrl + data?.mainImage?.path?.replace("uploads\\", "uploads/thumbnail/"),
			description,
			siteUrl,
			siteName: "Global Finance"
		}

		res.render("client/index", {
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