// controlls all the post requests
import blog from "../../libs/blog";
import { Request, Response } from "express";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";

export default async function createBlog(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);

	const { topic, subTopic, content, keywords, description } = req.body;

	try {
		const newBlog = await blog.create({
			topic,
			subTopic,
			content,
			keywords,
			description
		});
		
		res.send(newBlog);
	}catch(err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}