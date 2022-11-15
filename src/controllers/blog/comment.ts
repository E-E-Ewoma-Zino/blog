// controlls all the post requests
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import blog from "../../libs/blog";
import { IBlog, IUser } from "../../interfaces/schema";
import messageBird from "../../utils/messageBird";

export default async function createComment(req: Request, res: Response): Promise<void> {
	const { comment, blogId } = req.body;

	try {
		const user = req.user as IUser;

		await blog.update({
			itemToUpdate: { _id: blogId } as IBlog,
			optionsToUse: "$push",
			propertyToUpdate: "comments",
			updateValue: {
				user: {
					email: user?.email,
					username: user?.username
				},
				comment: comment.toString(),
				isVerified: false,
				createdAt: Date.now()
			}
		});

		messageBird.message(ALERTS.SUCCESS, "Thank you for your comment");
		// res.status(STATUS.CREATED_201).json(SERVER_RES({ message: "Ceated new comment", err: null, status: STATUS.CREATED_201, alert: ALERTS.SUCCESS }));
		res.redirect("back");
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		res.redirect("back");
		// res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}