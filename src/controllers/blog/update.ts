// controlls update for blog post requests
import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";
import Blogs from "../../schema/Blogs";

export default async function editBolg(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);
	console.log("query", req.query);
	console.log("file", req.file);

	const { title, markdown, author, keywords, description } = req.body;
	let isImageUpdated = false;

	if(req.file) isImageUpdated = true;

	try {
		const updatedBlog = await Blogs.findOneAndUpdate({ _id: req.query.id }, { $set: { title , markdown, author, keywords, description, mainImage: req.file, isImageUpdated }});
		console.log("updated", updatedBlog);
		
		messageBird.message(ALERTS.SUCCESS, "Updated Blog");
		return res.redirect("back");
	}catch(err) {
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.redirect("back");
		// res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}