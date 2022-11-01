// controlls all the post requests
import comment from "../../libs/comment";
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";

export default async function createComment(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);

	const { userComment, blogId, commentId } = req.body;

	try {
		const newComment = await comment.create({
			comment: userComment,
			userId: res.locals.user.user_id,
			reply: commentId,
			blogId
		});
		
		res.status(STATUS.CREATED_201).json(SERVER_RES({ message: "Ceated new comment", err: null, status: STATUS.CREATED_201, alert: ALERTS.SUCCESS }));
	}catch(err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}