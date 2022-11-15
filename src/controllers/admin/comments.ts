// update blog comment

import { Request, Response } from "express";
import { Types } from "mongoose";
import ALERTS from "../../constants/alerts";
import STATUS from "../../constants/httpStatus";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog } from "../../interfaces/schema";
import blog from "../../libs/blog";
import messageBird from "../../utils/messageBird";

export async function verifyComment (req: Request, res: Response) {
	try{
		console.log("body", req.body);
		console.log("query", req.query);

		const queryId = new Types.ObjectId(req.query.id as string);

		const updateBlogComment = await blog.update({
			itemToUpdate: { _id: queryId } as IBlog,
			optionsToUse: "$set",
			propertyToUpdate: `comments.${req.body.itemId}.isVerified`,
			updateValue: true
		});

		if(updateBlogComment.err) res.status(STATUS.CONFLICT_409).json(SERVER_RES({ message: "Could not verify, try again", err: updateBlogComment.err, status: STATUS.CONFLICT_409, alert: ALERTS.DANGER }));

		res.status(STATUS.ACCPTED_202).json(SERVER_RES({ message: "Verified", err: updateBlogComment.err, status: STATUS.ACCPTED_202, alert: ALERTS.SUCCESS }));
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed To Verify", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}


export async function deleteComment (req: Request, res: Response) {
	try{
		console.log("body", req.body);
		console.log("query", req.query);

		const queryId = new Types.ObjectId(req.query.id as string);

		const updateBlogComment = await blog.update({
			itemToUpdate: { _id: queryId } as IBlog,
			optionsToUse: "$pull",
			propertyToUpdate: `comments`,
			updateValue: { _id: req.body.itemId }
		});

		if(updateBlogComment.err) res.status(STATUS.CONFLICT_409).json(SERVER_RES({ message: "Could not verify, try again", err: updateBlogComment.err, status: STATUS.CONFLICT_409, alert: ALERTS.DANGER }));

		res.status(STATUS.ACCPTED_202).json(SERVER_RES({ message: "Verified", err: updateBlogComment.err, status: STATUS.ACCPTED_202, alert: ALERTS.SUCCESS }));
	}catch(err){
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed To Verify", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}