// controlls all the post requests
import fs from "fs";
import blog from "../../libs/blog";
import Blogs from "../../schema/Blogs";
import ALERTS from "../../constants/alerts";
import { Request, Response } from "express";
import STATUS from "../../constants/httpStatus";
import messageBird from "../../utils/messageBird";
import { SERVER_RES } from "../../constants/serverResponse";
import { IBlog } from "../../interfaces/schema";

export default async function deleteBolg(req: Request, res: Response): Promise<void> {
	console.log("body", req.body);

	const { itemId } = req.body;

	try {
		const theBlog = await blog.findById(itemId);
		const data = theBlog.data as IBlog;
		
		// delete img
		if (data) fs.stat(__dirname + "../../../../" + data.mainImage.path, (fsStats_err, stats) => {
			if (fsStats_err) {
				console.error("fsStats_err:", fsStats_err);
				try {
					throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
				} catch (err) {
					messageBird.message(ALERTS.DANGER, "Failed!");
					console.log("The Error:", err);
				}
			}
			// Using fs to also delete the book file
			else fs.unlink(__dirname + "../../../../" + data.mainImage.path, async (unlink_err) => {
				if (unlink_err) {
					console.error("unlink_err:", unlink_err);
					try {
						throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger" };
					} catch (err) {
						messageBird.message(ALERTS.DANGER, "Failed!");
						console.log("The Error:", err);
					}
				}
				else {
					console.log("=================SAVE===============");
					console.log("file deleted successfully");
					
					await blog.remove(itemId);
					messageBird.message(ALERTS.SUCCESS, "Deleted Blog");
				}
			});
		});

		res.status(STATUS.NO_CONTENT_204).json(SERVER_RES({ message: "Deleted Blog", err: null, status: STATUS.NO_CONTENT_204, alert: ALERTS.SUCCESS }));
	} catch (err) {
		const _err = err as Error;
		console.log("Error:", _err);
		messageBird.message(ALERTS.DANGER, "Internal Server Error");
		res.status(STATUS.SERVER_ERR_500).json(SERVER_RES({ message: "Failed Login", err: _err.message, status: STATUS.SERVER_ERR_500, alert: ALERTS.DANGER }));
	}
}