// controlls all the post requests
import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";
import preBlog from "../../module/preBlog";

export default async function createBlog(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);
	console.log("file", req.file);

	const { title, markdown, subTitle, author, keywords, description } = req.body;

	try {
		const newBlog = await blog.create({
			title,
			author,
			subTitle,
			markdown,
			keywords,
			description,
			mainImage: req.file
		});
		
		if(newBlog.err) messageBird.message(ALERTS.DANGER, newBlog.err as string);
		else messageBird.message(ALERTS.SUCCESS, "New Blog Created");

		// pre validate blog
		preBlog(newBlog.data!._id);

		res.redirect("back");
	}catch(err) {
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.redirect("back");
		// res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}