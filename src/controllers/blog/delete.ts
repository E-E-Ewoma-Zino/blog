// controlls all the post requests
import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";
import Blogs from "../../schema/Blogs";

export default async function deleteBolg(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);
	console.log("file", req.file);

	const { blogId } = req.body;

	try {
		
		messageBird.message(ALERTS.SUCCESS, "Deleted Blog");
		return res.redirect("back");

		const deletedBolg = await blog.remove(blogId);
		console.log("deleted", deletedBolg);
		
	}catch(err) {
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.redirect("back");
		// res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}